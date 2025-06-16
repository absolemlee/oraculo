import { useState } from 'react';
import Head from 'next/head';
import ichingData from '../resources/iching/data/iching.js';
import SidebarLayout from '../components/layout/sidebar-layout';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';

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
    <SidebarLayout>
      <div className="mx-auto max-w-2xl p-4">
      <Head>
        <title>Oracular Consultant</title>
      </Head>
      {!result && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Present your question to the Oracle</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Textarea value={question} onChange={e => setQuestion(e.target.value)} placeholder="Write your question here." required />
              <Button type="submit">Ask</Button>
            </form>
          </CardContent>
        </Card>
      )}
      {result && (
        <Card className="print:shadow-none print:border print:p-8">
          <CardHeader>
            <CardTitle>Consultation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <section>
              <h3 className="text-xl font-semibold mb-2">Question</h3>
              <p className="text-center italic">{result.question}</p>
            </section>

            <section className="text-center">
              <h3 className="text-xl font-semibold mb-2">Primary Symbol: {result.number}</h3>
              <div className="text-5xl mb-2">{result.details.hex_font}</div>
              <p className="font-semibold italic">{result.details.english}</p>
              <p>{result.details.wilhelm_symbolic}</p>
            </section>

            {result.details.wilhelm_judgment && (
              <section>
                <h3 className="text-xl font-semibold mb-2">Oracular Domain</h3>
                <p>{result.details.wilhelm_judgment.text}</p>
                <p className="text-sm"><strong>Explanation:</strong> {result.details.wilhelm_judgment.comments}</p>
              </section>
            )}

            {result.details.wilhelm_image && (
              <section>
                <h3 className="text-xl font-semibold mb-2">Oracular Image</h3>
                <p>{result.details.wilhelm_image.text}</p>
                <p className="text-sm"><strong>Explanation:</strong> {result.details.wilhelm_image.comments}</p>
              </section>
            )}

            {result.changingLineDetails && result.changingLineDetails.length > 0 && (
              <section>
                <h3 className="text-xl font-semibold mb-2">Changing Layers</h3>
                {result.changingLineDetails.map(l => (
                  <p key={l.line}>
                    <strong>Layer {l.line}:</strong> {l.text}<br />
                    <em>{l.comments}</em>
                  </p>
                ))}
              </section>
            )}

            {result.hasChanging && (
              <section className="text-center">
                <h3 className="text-xl font-semibold mb-2">Looking Forward</h3>
                <p>There is only now, there is only here. The developing situation as shown by the layers of change, show the most probable result in response to your question.</p>
                <div className="text-5xl mb-2">{result.transformedDetails.hex_font}</div>
                <p><strong>Symbolic Name:</strong> {result.transformedDetails.english}</p>
                <p><strong>Symbolic Meaning:</strong> {result.transformedDetails.wilhelm_symbolic}</p>
              </section>
            )}
          </CardContent>
        </Card>
      )}
    </div>
    </SidebarLayout>
  );
}
