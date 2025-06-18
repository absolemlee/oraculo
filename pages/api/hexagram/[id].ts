import type { NextApiRequest, NextApiResponse } from 'next'
import ichingData from '../../../resources/iching/data/iching'
import { setCors } from '../../../lib/cors'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  setCors(res)

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  const { id } = req.query
  const numericId = parseInt(id as string, 10)
  if (isNaN(numericId)) {
    res.status(400).json({ error: 'Invalid hexagram ID' })
    return
  }
  const data = (ichingData as any)[numericId]
  if (!data) {
    res.status(404).json({ error: 'Hexagram not found' })
  } else {
    res.status(200).json(data)
  }
}
