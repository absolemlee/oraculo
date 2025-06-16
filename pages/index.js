import { useState } from 'react';
import Head from 'next/head';
import ichingData from '../resources/iching/data/iching.js';

const CHANGING_YANG = 9;  // Three heads
const YANG = 7;           // Two heads, one tail
const YIN = 6;            // Two tails, one head
const CHANGING_YIN = 8;   // Three tails

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
  return parseInt(hex.map(l => (l === YANG || l === CHANGING_YANG ? '1' : '0')).join(''), 2);
}

function getHexagramNumber(hex) {
  return hexagramIdFromLines(hex) + 1;
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
      changingLines.push(...processed.changingLines);
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
        <title>Oraculo</title>
        <link rel="stylesheet" href="/iching.css" />
      </Head>
      {!result && (
        <ul className="responsive-table">
          <li className="table-header">
            <div className="col col-1" style={{ textAlign: 'center' }}>
              <h1><strong>Pose your question to the Oracle here:</strong></h1>
              <form onSubmit={handleSubmit}>
                <input type="text" value={question} onChange={e => setQuestion(e.target.value)} placeholder="Write your question here." required /><br /><br />
                <input type="submit" value="Ask" />
              </form>
            </div>
          </li>
        </ul>
      )}
      {result && (
        <div>
          <h2>The Oracle's Response</h2>
          <ul className="responsive-table">
            <li className="table-header">
              <div className="col col-1" style={{ textAlign: 'center' }}>
                <h1><strong>Your question:</strong><br /><br /><em>{result.question}</em></h1>
              </div>
            </li>
            <li className="table-header">
              <div className="col col-1" style={{ textAlign: 'center' }}>
                <h1><strong>The Oracle Responds:</strong></h1>
                <br />Hexagram {result.number}<br />
                <span style={{ fontSize: '4.2em' }}>{result.details.hex_font}</span><br />
                <strong><em>{result.details.english}</em></strong><br />
                <p>{result.details.wilhelm_symbolic}</p>
              </div>
            </li>
              {result.details.wilhelm_judgment && (
                <li className="table-header">
                  <div className="comment-section">
                    <h3>The Oracle's Judgment</h3>
                    <p>{result.details.wilhelm_judgment.text}</p>
                    <p><strong>Explanation:</strong> {result.details.wilhelm_judgment.comments}</p>
                  </div>
                </li>
              )}
              {result.details.wilhelm_image && (
                <li className="table-header">
                  <div className="comment-section">
                    <h3>The Image Presented</h3>
                    <p>{result.details.wilhelm_image.text}</p>
                    <p><strong>Explanation:</strong> {result.details.wilhelm_image.comments}</p>
                  </div>
                </li>
              )}
            {result.changingLineDetails && result.changingLineDetails.length > 0 && (
              <li className="table-header">
                <div className="comment-section">
                  <h3>Changing Lines</h3>
                  {result.changingLineDetails.map(l => (
                    <p key={l.line}>
                      <strong>Line {l.line}:</strong> {l.text}<br />
                      <em>{l.comments}</em>
                    </p>
                  ))}
                </div>
              </li>
            )}
            {result.hasChanging && (
              <li className="table-header">
                <div className="comment-section">
                  <h3>The Future</h3>
                  <p>The Oracle says that changes are occurring, the path you are on will most likely lead towards:</p>
                  <h3>Hexagram: {result.transformedNumber}</h3>
                  <h1><span style={{ fontSize: '3.5em' }}>{result.transformedDetails.hex_font}</span></h1>
                  <p><strong>Modern Name:</strong><br /> {result.transformedDetails.english}<br /></p>
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
