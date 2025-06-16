// API route to generate a random hexagram reading.
// This allows Oraculo to be consumed as a module in larger projects.
// Query parameter `question` is optional and echoed back in the response.

import ichingData from '../../resources/iching/data/iching.js';

const CHANGING_YANG = 9;  // Three heads
const YANG = 7;           // Two heads, one tail
const YIN = 6;            // Two tails, one head
const CHANGING_YIN = 8;   // Three tails

function generateLine() {
  let heads = 0;
  for (let i = 0; i < 3; i++) heads += Math.round(Math.random());
  if (heads === 3) return CHANGING_YANG;
  if (heads === 2) return YANG;
  if (heads === 1) return YIN;
  return CHANGING_YIN;
}

function generateHexagram() {
  const h = [];
  for (let i = 0; i < 6; i++) h.push(generateLine());
  return h;
}

function hexagramIdFromLines(hex) {
  return parseInt(hex.map(l => (l === YANG || l === CHANGING_YANG ? '1' : '0')).join(''), 2);
}

export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }
  const question = Array.isArray(req.query.question) ? req.query.question[0] : (req.query.question || '');
  const hex = generateHexagram();
  const number = hexagramIdFromLines(hex) + 1;
  const details = ichingData[number];
  const hasChanging = hex.includes(CHANGING_YANG) || hex.includes(CHANGING_YIN);

  let transformedNumber = null;
  let transformedDetails = null;
  if (hasChanging) {
    const transformed = hex.map(l => l === CHANGING_YANG ? YIN : l === CHANGING_YIN ? YANG : l);
    transformedNumber = hexagramIdFromLines(transformed) + 1;
    transformedDetails = ichingData[transformedNumber];
  }

  res.status(200).json({ question, number, details, hasChanging, transformedNumber, transformedDetails });
}
