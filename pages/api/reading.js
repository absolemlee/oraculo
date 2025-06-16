// API route to generate a random hexagram reading.
// This allows Oraculo to be consumed as a module in larger projects.
// A question can be provided either as a query parameter (GET)
// or in the JSON body of a POST request. The question value is
// echoed back in the response.

import ichingData from '../../resources/iching/data/iching.js';

const CHANGING_YANG = 9;  // Three heads
const YANG = 7;           // Two heads, one tail
const YIN = 6;            // Two tails, one head
const CHANGING_YIN = 8;   // Three tails

// Map binary sequences to King Wen hexagram numbers
const BINARY_TO_WEN = {};
Object.keys(ichingData).forEach(num => {
  const bin = ichingData[num].binary.toString().padStart(6, '0');
  BINARY_TO_WEN[bin] = parseInt(num, 10);
});

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
  const binStr = hex
    .map(l => (l === YANG || l === CHANGING_YANG ? '1' : '0'))
    .join('');
  return BINARY_TO_WEN[binStr];
}

export default function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }
  const question = req.method === 'POST'
    ? (req.body && req.body.question) || ''
    : Array.isArray(req.query.question)
      ? req.query.question[0]
      : (req.query.question || '');
  const hex = generateHexagram();
  const number = hexagramIdFromLines(hex);
  const details = ichingData[number];
  const hasChanging = hex.includes(CHANGING_YANG) || hex.includes(CHANGING_YIN);
  let transformedNumber = null;
  let transformedDetails = null;
  let changingLineDetails = [];
  if (hasChanging) {
    changingLineDetails = collectChangingLineDetails(hex, details);
    const transformed = hex.map(l => (l === CHANGING_YANG ? YIN : l === CHANGING_YIN ? YANG : l));
    transformedNumber = hexagramIdFromLines(transformed);
    transformedDetails = ichingData[transformedNumber];
  }
  res.status(200).json({ question, number, details, hasChanging, transformedNumber, transformedDetails, changingLineDetails });
}

function collectChangingLineDetails(hex, details) {
  const changingLineDetails = [];
  hex.forEach((l, idx) => {
    if (l === CHANGING_YANG || l === CHANGING_YIN) {
      const lineNo = idx + 1;
      const lineData = details.wilhelm_lines[String(lineNo)];
      if (lineData) {
        changingLineDetails.push({ line: lineNo, ...lineData });
      }
    }
  });
  return changingLineDetails;
}
