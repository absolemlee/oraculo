import { useState } from 'react';
import Head from 'next/head';

export default function AIOraclePage() {
  const [question, setQuestion] = useState('');
  const [agentId, setAgentId] = useState('test-agent-v1');
  const [context, setContext] = useState('');
  const [loading, setLoading] = useState(false);
  const [reading, setReading] = useState<any>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setReading(null);

    try {
      const response = await fetch('/api/ai-oracle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question,
          requestedBy: agentId || undefined,
          context: context || undefined
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      setReading(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get reading');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>AI Oracle Console - Oráculo</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">AI-Optimized Oracle Console</h1>
            <p className="text-purple-200">
              Testing endpoint for AI/LLM agent consumption
            </p>
            <div className="mt-4 p-4 bg-purple-900/30 rounded-lg border border-purple-500/30">
              <p className="text-sm text-purple-200">
                <strong>Endpoint:</strong> POST /api/ai-oracle
              </p>
              <p className="text-sm text-purple-200">
                <strong>Purpose:</strong> Structured oracle readings optimized for AI consumption with prompt helpers, confidence scores, and actionable insights
              </p>
            </div>
          </div>

          {/* Request Form */}
          <div className="bg-slate-800/50 rounded-lg p-6 mb-8 backdrop-blur">
            <h2 className="text-2xl font-semibold mb-4">Request Reading</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Question (required)
                </label>
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-900 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 text-white"
                  rows={3}
                  placeholder="What guidance do I need for my current situation?"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Agent ID (optional)
                  </label>
                  <input
                    type="text"
                    value={agentId}
                    onChange={(e) => setAgentId(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-900 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 text-white"
                    placeholder="my-ai-agent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Context (optional)
                  </label>
                  <input
                    type="text"
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-900 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 text-white"
                    placeholder="User seeking career advice"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !question}
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? 'Consulting Oracle...' : 'Get AI Oracle Reading'}
              </button>
            </form>

            {error && (
              <div className="mt-4 p-4 bg-red-900/30 border border-red-500/50 rounded-lg">
                <p className="text-red-200">Error: {error}</p>
              </div>
            )}
          </div>

          {/* Reading Result */}
          {reading && (
            <div className="space-y-6">
              {/* Executive Summary */}
              <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-lg p-6 border border-purple-500/30">
                <h2 className="text-2xl font-semibold mb-4">📊 Executive Summary</h2>
                <div className="space-y-3">
                  <div>
                    <span className="text-purple-300 font-medium">ID:</span>{' '}
                    <span className="text-sm font-mono">{reading.id}</span>
                  </div>
                  <div>
                    <span className="text-purple-300 font-medium">Confidence:</span>{' '}
                    <span className={`font-bold ${reading.summary.confidence >= 0.8 ? 'text-green-400' : reading.summary.confidence >= 0.6 ? 'text-yellow-400' : 'text-orange-400'}`}>
                      {(reading.summary.confidence * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div>
                    <span className="text-purple-300 font-medium">Complexity:</span>{' '}
                    <span className="capitalize">{reading.summary.complexity}</span>
                  </div>
                  <div>
                    <span className="text-purple-300 font-medium">Suggested Tone:</span>{' '}
                    <span className="capitalize">{reading.summary.suggestedTone}</span>
                  </div>
                  <div>
                    <span className="text-purple-300 font-medium">Processing Time:</span>{' '}
                    {reading.metadata.processingTimeMs}ms
                  </div>
                  <div>
                    <p className="text-purple-300 font-medium mb-2">Primary Message:</p>
                    <p className="text-white leading-relaxed">{reading.summary.primaryMessage}</p>
                  </div>
                  <div>
                    <p className="text-purple-300 font-medium mb-2">Key Themes:</p>
                    <div className="flex flex-wrap gap-2">
                      {reading.summary.keyThemes.map((theme: string, i: number) => (
                        <span key={i} className="px-3 py-1 bg-purple-800/50 rounded-full text-sm">
                          {theme}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Prompt Helpers */}
              <div className="bg-slate-800/50 rounded-lg p-6 backdrop-blur">
                <h2 className="text-2xl font-semibold mb-4">🤖 Prompt Helpers</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-purple-300 font-medium mb-2">Context Summary:</p>
                    <p className="text-sm bg-slate-900 p-4 rounded border border-purple-500/30">
                      {reading.promptHelpers.contextSummary}
                    </p>
                  </div>
                  <div>
                    <p className="text-purple-300 font-medium mb-2">Response Framing:</p>
                    <p className="text-sm bg-slate-900 p-4 rounded border border-purple-500/30">
                      {reading.promptHelpers.responseFraming}
                    </p>
                  </div>
                  <div>
                    <p className="text-purple-300 font-medium mb-2">Emphasis Points:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {reading.promptHelpers.emphasisPoints.map((point: string, i: number) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Temporal Guidance */}
              <div className="bg-slate-800/50 rounded-lg p-6 backdrop-blur">
                <h2 className="text-2xl font-semibold mb-4">🔮 Temporal Guidance (Runes)</h2>
                <p className="text-purple-200 mb-4">{reading.reading.temporalGuidance.description}</p>
                <div className="grid md:grid-cols-3 gap-4">
                  {['past', 'present', 'future'].map((position) => {
                    const rune = reading.reading.temporalGuidance[position];
                    return (
                      <div key={position} className="bg-slate-900/50 p-4 rounded-lg border border-purple-500/20">
                        <div className="text-center mb-3">
                          <div className="text-5xl mb-2">{rune.symbol}</div>
                          <div className="font-semibold text-lg">{rune.symbolName}</div>
                          <div className="text-sm text-purple-300 capitalize">{position}</div>
                          <div className="text-xs text-purple-400">{rune.orientation}</div>
                        </div>
                        <div className="space-y-2 text-sm">
                          <p><strong>Element:</strong> {rune.element}</p>
                          <p><strong>Keywords:</strong> {rune.keywords.join(', ')}</p>
                          <p className="text-purple-200">{rune.meaning}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 p-4 bg-purple-900/20 rounded">
                  <p className="text-sm italic">{reading.reading.temporalGuidance.narrative}</p>
                </div>
              </div>

              {/* Current Energy */}
              <div className="bg-slate-800/50 rounded-lg p-6 backdrop-blur">
                <h2 className="text-2xl font-semibold mb-4">✨ Current Energy (Tarot)</h2>
                <p className="text-purple-200 mb-4">{reading.reading.currentEnergy.description}</p>
                <div className="bg-slate-900/50 p-6 rounded-lg border border-purple-500/20">
                  <div className="text-center mb-4">
                    <h3 className="text-2xl font-bold">{reading.reading.currentEnergy.card.name}</h3>
                    <p className="text-purple-300">
                      {reading.reading.currentEnergy.card.arcana === 'major' ? 'Major Arcana' : `Minor Arcana - ${reading.reading.currentEnergy.card.suit}`}
                      {' • '}
                      {reading.reading.currentEnergy.card.orientation}
                    </p>
                  </div>
                  <div className="space-y-3 text-sm">
                    <p><strong>Keywords:</strong> {reading.reading.currentEnergy.card.keywords.join(', ')}</p>
                    {reading.reading.currentEnergy.card.element && (
                      <p><strong>Element:</strong> {reading.reading.currentEnergy.card.element}</p>
                    )}
                    <p className="text-purple-200">{reading.reading.currentEnergy.card.meaning}</p>
                    <div className="p-3 bg-purple-900/20 rounded">
                      <p className="italic">{reading.reading.currentEnergy.practicalAdvice}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actionable Insights */}
              <div className="bg-slate-800/50 rounded-lg p-6 backdrop-blur">
                <h2 className="text-2xl font-semibold mb-4">💡 Actionable Insights</h2>
                <div className="space-y-3">
                  {reading.guidance.actionableInsights.map((insight: any, i: number) => (
                    <div key={i} className="bg-slate-900/50 p-4 rounded-lg border-l-4 border-purple-500">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          insight.priority === 'high' ? 'bg-red-900/50 text-red-200' :
                          insight.priority === 'medium' ? 'bg-yellow-900/50 text-yellow-200' :
                          'bg-blue-900/50 text-blue-200'
                        }`}>
                          {insight.priority} priority
                        </span>
                        <span className="px-2 py-1 rounded text-xs bg-purple-900/50 text-purple-200">
                          {insight.category}
                        </span>
                      </div>
                      <p className="font-semibold mb-1">{insight.action}</p>
                      <p className="text-sm text-purple-200">{insight.rationale}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Raw JSON */}
              <div className="bg-slate-800/50 rounded-lg p-6 backdrop-blur">
                <h2 className="text-2xl font-semibold mb-4">📄 Raw JSON Response</h2>
                <pre className="text-xs bg-slate-900 p-4 rounded overflow-x-auto border border-purple-500/30">
                  {JSON.stringify(reading, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
