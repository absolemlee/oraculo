import type { NextApiRequest, NextApiResponse } from 'next'
import ichingData from '../../resources/iching/data/iching'
import { setCors } from '../../lib/cors'

const CHANGING_YANG = 9
const YANG = 7
const YIN = 6
const CHANGING_YIN = 8

const BINARY_TO_WEN: Record<string, number> = {}
Object.keys(ichingData).forEach(num => {
  const bin = (ichingData as any)[num].binary.toString().padStart(6, '0')
  BINARY_TO_WEN[bin] = parseInt(num, 10)
})

function generateLine(): number {
  let heads = 0
  for (let i = 0; i < 3; i++) heads += Math.round(Math.random())
  if (heads === 3) return CHANGING_YANG
  if (heads === 2) return YANG
  if (heads === 1) return YIN
  return CHANGING_YIN
}

function generateHexagram(): number[] {
  const h: number[] = []
  for (let i = 0; i < 6; i++) h.push(generateLine())
  return h
}

function hexagramIdFromLines(hex: number[]): number {
  const binStr = hex.map(l => (l === YANG || l === CHANGING_YANG ? '1' : '0')).join('')
  return BINARY_TO_WEN[binStr]
}

function collectChangingLineDetails(hex: number[], details: any) {
  const changingLineDetails: any[] = []
  hex.forEach((l, idx) => {
    if (l === CHANGING_YANG || l === CHANGING_YIN) {
      const lineNo = idx + 1
      const lineData = details.wilhelm_lines[String(lineNo)]
      if (lineData) {
        changingLineDetails.push({ line: lineNo, ...lineData })
      }
    }
  })
  return changingLineDetails
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  setCors(res)

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'GET' && req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' })
    return
  }

  const question = req.method === 'POST'
    ? (req.body && (req.body as any).question) || ''
    : Array.isArray(req.query.question)
      ? req.query.question[0]
      : (req.query.question as string) || ''

  const hex = generateHexagram()
  const number = hexagramIdFromLines(hex)
  const details = (ichingData as any)[number]
  const hasChanging = hex.includes(CHANGING_YANG) || hex.includes(CHANGING_YIN)
  let transformedNumber: number | null = null
  let transformedDetails: any = null
  let changingLineDetails: any[] = []
  if (hasChanging) {
    changingLineDetails = collectChangingLineDetails(hex, details)
    const transformed = hex.map(l => (l === CHANGING_YANG ? YIN : l === CHANGING_YIN ? YANG : l))
    transformedNumber = hexagramIdFromLines(transformed)
    transformedDetails = (ichingData as any)[transformedNumber]
  }
  res.status(200).json({ question, number, details, hasChanging, transformedNumber, transformedDetails, changingLineDetails })
}
