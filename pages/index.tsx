import { useState, FormEvent } from 'react'
import Head from 'next/head'
import ichingData from '@/resources/iching/data/iching'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { H1, H3, P, Small } from '@/components/ui/typography'

const CHANGING_YANG = 9
const YANG = 7
const YIN = 6
const CHANGING_YIN = 8

const BINARY_TO_WEN: Record<string, number> = {}
Object.keys(ichingData).forEach(num => {
  const bin = (ichingData as any)[num].binary.toString().padStart(6, '0')
  BINARY_TO_WEN[bin] = parseInt(num, 10)
})
// Function to generate a single line of the hexagram
// 0 = Yin, 1 = Yang, 2 = Changing Yin, 3 = Changing Yang
// We use Math.round(Math.random()) to simulate coin flips
// 0 = Yin, 1 = Yang, 2 = Changing Yin, 3 = Changing Yang
// Heads: 0, Tails: 1
function generateLine(): number {
  let heads = 0
  for (let i = 0; i < 3; i++) heads += Math.round(Math.random())
  if (heads === 3) return CHANGING_YANG
  if (heads === 2) return YANG
  if (heads === 1) return YIN
  return CHANGING_YIN
}
// Function to generate a complete hexagram (6 lines)
function generateHexagram(): number[] {
  const h: number[] = []
  for (let i = 0; i < 6; i++) h.push(generateLine())
  return h
}
// Function to convert hexagram lines to a unique ID
function hexagramIdFromLines(hex: number[]): number {
  const binStr = hex.map(l => (l === YANG || l === CHANGING_YANG ? '1' : '0')).join('')
  return BINARY_TO_WEN[binStr]
}
// Function to get the hexagram number from the hexagram lines
function getHexagramNumber(hex: number[]): number {
  return hexagramIdFromLines(hex)
}
// Function to process changing lines and return transformed hexagram
function processChangingLines(hex: number[], details: any) {
  const changingLines: number[] = []
  const changingLineDetails: any[] = []
  hex.forEach((l, idx) => {
    if (l === CHANGING_YANG || l === CHANGING_YIN) {
      const lineNo = idx + 1
      changingLines.push(lineNo)
      const lineData = details.wilhelm_lines[String(lineNo)]
      if (lineData) {
        changingLineDetails.push({ line: lineNo, ...lineData })
      }
    }
  })
  // Transform the hexagram based on changing lines
  const transformed = hex.map(l => (l === CHANGING_YANG ? YIN : l === CHANGING_YIN ? YANG : l))
  const transformedNumber = getHexagramNumber(transformed)
  const transformedDetails = (ichingData as any)[transformedNumber]
  return { changingLines, changingLineDetails, transformed, transformedNumber, transformedDetails }
}
// Main component for the home page
export default function Home() {
  const [question, setQuestion] = useState('')
  const [result, setResult] = useState<any | null>(null)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const hex = generateHexagram()
    const number = getHexagramNumber(hex)
    const details = (ichingData as any)[number]
    const hasChanging = hex.includes(CHANGING_YANG) || hex.includes(CHANGING_YIN)
    let transformedNumber: number | null = null
    let transformedDetails: any = null
    let changingLineDetails: any[] = []
    if (hasChanging) {
      const processed = processChangingLines(hex, details)
      changingLineDetails = processed.changingLineDetails
      transformedNumber = processed.transformedNumber
      transformedDetails = processed.transformedDetails
    }

    setResult({ question, number, details, hasChanging, transformedNumber, transformedDetails, changingLineDetails })
  }
// Render the component
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Head>
        <title>Oracular Consultant</title>
      </Head>
      {!result && (
        <Card className="w-fullmax-w-md">
          <CardHeader>
            <CardTitle>Present your question to the Oracle</CardTitle>
            <CardDescription>Enter your question below</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Textarea
                value={question}
                onChange={e => setQuestion(e.target.value)}
                placeholder="Write your question here."
                required />
            </form>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">Ask</Button>
          </CardFooter>
        </Card>
      )}
      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Consultation</CardTitle>
          </CardHeader>
          <CardContent>
            <section>
              <H3>Question</H3>
              <P>{result.question}</P>
            </section>
        
            <section>
              <H3>Primary Symbol: {result.number}</H3>
              <H1>{result.details.hex_font}</H1>
              <P>{result.details.english}</P>
              <P>{result.details.wilhelm_symbolic}</P>
            </section>

            {result.details.wilhelm_judgment && (
              <section>
                <H3>Oracular Domain</H3>
                <P>{result.details.wilhelm_judgment.text}</P>
                <Small>
                  <strong>Explanation:</strong> {result.details.wilhelm_judgment.comments}
                </Small>
              </section>
            )}

            {result.details.wilhelm_image && (
              <section>
                <H3>Oracular Image</H3>
                <P>{result.details.wilhelm_image.text}</P>
                <Small>
                  <strong>Explanation:</strong> {result.details.wilhelm_image.comments}
                </Small>
              </section>
            )}

            {result.changingLineDetails && result.changingLineDetails.length > 0 && (
              <section>
                <H3>Changing Layers</H3>
                {result.changingLineDetails.map((l: any) => (
                  <P key={l.line}>
                    <strong>Layer {l.line}:</strong> {l.text}
                    <br />
                    <em>{l.comments}</em>
                  </P>
                ))}
              </section>
            )}

            {result.hasChanging && (

              <section>


                <H3>Looking Forward</H3>
                <P>
                  There is only now, there is only here. The developing situation as shown by the layers of change, show the most probable result in response to your question.
                </P>
                <H1>{result.transformedDetails.hex_font}</H1>
                <P>
                  <strong>Symbolic Name:</strong> {result.transformedDetails.english}
                </P>
                <P>
                  <strong>Symbolic Meaning:</strong> {result.transformedDetails.wilhelm_symbolic}
                </P>
              </section>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
