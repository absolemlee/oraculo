import { useState } from 'react';
import Head from 'next/head';
import ichingData from '../resources/iching/data/iching.js';

const CHANGING_YANG = 9;  // Three heads
const YANG = 7;           // Two heads, one tail
const YIN = 6;            // Two tails, one head
const CHANGING_YIN = 8;   // Three tails

// Map binary line patterns to the traditional King Wen hexagram numbers
const BINARY_TO_WEN = {};
Object.keys(ichingData).forEach(num => {
  const bin = ichingData[num].binary.toString().padStart(6, '0');
  BINARY_TO_WEN[bin] = parseInt(num, 10);
});

function generateLine() {
  let heads = 0;
  for (let i = 0; i < 3; i++) {
    heads += Math.round(Math.random());
  }
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

function getHexagramNumber(hex) {
  return hexagramIdFromLines(hex);
}

function processChangingLines(hex, details) {
  const changingLines = [];
  const changingLineDetails = [];
  hex.forEach((l, idx) => {
    if (l === CHANGING_YANG || l === CHANGING_YIN) {
      const lineNo = idx + 1;
      changingLines.push(lineNo);
      const lineData = details.wilhelm_lines[String(lineNo)];
      if (lineData) {
        changingLineDetails.push({ line: lineNo, ...lineData });
      }
    }
  });
  const transformed = hex.map(l => (l === CHANGING_YANG ? YIN : l === CHANGING_YIN ? YANG : l));
  const transformedNumber = getHexagramNumber(transformed);
  const transformedDetails = ichingData[transformedNumber];
  return { changingLines, changingLineDetails, transformed, transformedNumber, transformedDetails };
}

export default function Home() {
  const [question, setQuestion] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const hex = generateHexagram();
    const number = getHexagramNumber(hex);
    const details = ichingData[number];

    const hasChanging = hex.includes(CHANGING_YANG) || hex.includes(CHANGING_YIN);
    let transformed = null;
    let transformedNumber = null;
    let transformedDetails = null;
    let changingLineDetails = [];
    if (hasChanging) {
      const processed = processChangingLines(hex, details);
      changingLineDetails = processed.changingLineDetails;
      transformed = processed.transformed;
      transformedNumber = processed.transformedNumber;
      transformedDetails = processed.transformedDetails;
    }

    setResult({ question, number, details, hasChanging, transformedNumber, transformedDetails, changingLineDetails });
  };

  return (
    <div className="container">
      <Head>
        <title>Oracular Consultant</title>
        <link rel="stylesheet" href="/iching.css" />
      </Head>
      {!result && (
        <ul className="responsive-table">
          <li className="table-header">
            <div className="comment-section">
              <h1><strong>Present your question to the Oracle:</strong></h1>
              <form onSubmit={handleSubmit}>
                <textarea value={question} onChange={e => setQuestion(e.target.value)} placeholder="Write your question here." required /><br /><br />
                <input type="submit" value="Ask" />
              </form>
            </div>
          </li>
        </ul>
      )}
      {result && (
        <div>
          <h2>Oracular Consultation</h2>
          <ul className="responsive-table">
            <li className="table-header">
              <div className="comment-section">
                <h1><strong>Focal query:</strong></h1><br /><br /><h2><em>{result.question}</em></h2>
              </div>
            </li>
            <li className="table-header">
              <div className="comment-section">
                <h1><strong>Oracular Response:</strong></h1>
                <h3>Primary Symbol: {result.number}</h3>
                <h1><span style={{ fontSize: '3.5em' }}>{result.details.hex_font}</span></h1>
                <strong><em>{result.details.english}</em></strong><br />
                <p>{result.details.wilhelm_symbolic}</p>
              </div>
            </li>
              {result.details.wilhelm_judgment && (
                <li className="table-header">
                  <div className="comment-section">
                    <h3>Oracular Domain</h3>
                    <p>{result.details.wilhelm_judgment.text}</p>
                    <p><strong>Explanation:</strong> {result.details.wilhelm_judgment.comments}</p>
                  </div>
                </li>
              )}
              {result.details.wilhelm_image && (
                <li className="table-header">
                  <div className="comment-section">
                    <h3>Oracular Image</h3>
                    <p>{result.details.wilhelm_image.text}</p>
                    <p><strong>Explanation:</strong> {result.details.wilhelm_image.comments}</p>
                  </div>
                </li>
              )}
            {result.changingLineDetails && result.changingLineDetails.length > 0 && (
              <li className="table-header">
                <div className="comment-section">
                  <h3>Changing Layers</h3>
                  {result.changingLineDetails.map(l => (
                    <p key={l.line}>
                      <strong>Layer {l.line}:</strong> {l.text}<br />
                      <em>{l.comments}</em>
                    </p>
                  ))}
                </div>
              </li>
            )}
            {result.hasChanging && (
              <li className="table-header">
                <div className="comment-section">
                  <h3>Looking Forward</h3>
                  <p>There is only now, there is only here. The developing situation as shown by the layers of change, show the most probable result in response to your question.
                  </p>
                  <h3>Symbol: {result.transformedNumber}</h3>
                  <h1><span style={{ fontSize: '3.5em' }}>{result.transformedDetails.hex_font}</span></h1>
                  <p><strong>Symbolic Name:</strong><br /> {result.transformedDetails.english}<br /></p>
                  <p><strong>Symbolic Meaning:</strong><br /><br /> {result.transformedDetails.wilhelm_symbolic}</p>
                </div>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
