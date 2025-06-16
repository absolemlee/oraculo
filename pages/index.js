import { useState } from 'react';
import Head from 'next/head';
import ichingData from '../resources/iching/data/iching.js';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { H1, H3, P, Small } from '../components/ui/typography';

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
    <div className="mx-auto max-w-2xl p-4">
      <Head>
        <title>Oracular Consultant</title>
      </Head>
      {!result && (
        <Card className="mb-6 bg-muted/50">
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
        <Card className="print:shadow-none print:border print:p-8 bg-muted/50">
          <CardHeader>
            <CardTitle>Consultation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <section>
              <H3 className="mb-2">Question</H3>
              <P className="text-center italic">{result.question}</P>
            </section>

            <section className="text-center">
              <H3 className="mb-2">Primary Symbol: {result.number}</H3>
              <H1 className="text-5xl mb-2">{result.details.hex_font}</H1>
              <P className="font-semibold italic">{result.details.english}</P>
              <P>{result.details.wilhelm_symbolic}</P>
            </section>

            {result.details.wilhelm_judgment && (
              <section>
                <H3 className="mb-2">Oracular Domain</H3>
                <P>{result.details.wilhelm_judgment.text}</P>
                <Small>
                  <strong>Explanation:</strong> {result.details.wilhelm_judgment.comments}
                </Small>
              </section>
            )}

            {result.details.wilhelm_image && (
              <section>
                <H3 className="mb-2">Oracular Image</H3>
                <P>{result.details.wilhelm_image.text}</P>
                <Small>
                  <strong>Explanation:</strong> {result.details.wilhelm_image.comments}
                </Small>
              </section>
            )}

            {result.changingLineDetails && result.changingLineDetails.length > 0 && (
              <section>
                <H3 className="mb-2">Changing Layers</H3>
                {result.changingLineDetails.map(l => (
                  <P key={l.line}>
                    <strong>Layer {l.line}:</strong> {l.text}
                    <br />
                    <em>{l.comments}</em>
                  </P>
                ))}
              </section>
            )}

            {result.hasChanging && (
              <section className="text-center">
                <H3 className="mb-2">Looking Forward</H3>
                <P>
                  There is only now, there is only here. The developing situation as shown by the layers of change, show the most probable result in response to your question.
                </P>
                <H1 className="text-5xl mb-2">{result.transformedDetails.hex_font}</H1>
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
  );
}
