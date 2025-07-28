import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

interface TraditionalReading {
  question: string;
  number: number;
  details: any;
  hasChanging: boolean;
  transformedNumber: number | null;
  transformedDetails: any;
  changingLineDetails: Array<{
    line: number;
    text: string;
    comments: string;
  }>;
}

export default function TraditionalConsole() {
  const router = useRouter();
  const [question, setQuestion] = useState('');
  const [reading, setReading] = useState<TraditionalReading | null>(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<TraditionalReading[]>([]);

  const getReading = async () => {
    if (!question.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/reading', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question })
      });
      const data = await response.json();
      setReading(data);
      setHistory(prev => [data, ...prev.slice(0, 9)]); // Keep last 10 readings
    } catch (error) {
      console.error('Error getting traditional reading:', error);
    } finally {
      setLoading(false);
    }
  };

  const parseIfaNames = (combinedName: string) => {
    const parts = combinedName.split(' + ');
    return {
      lower: parts[0] || parts[1],
      upper: parts[1] || parts[0]
    };
  };

  const renderGlyphWithLargerCircles = (glyph: string) => {
    return glyph.split('').map((char, index) => (
      <span 
        key={index} 
        style={{ 
          fontSize: char === '◯' ? '2.1rem' : '1.2rem',
          fontWeight: char === '◯' ? 'bold' : 'normal'
        }}
      >
        {char}
      </span>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Traditional I-Ching Console</h1>
            <p className="text-gray-600 mt-1">Classical Chinese divination system with changing lines</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => router.push('/dashboard')}>
              ← Dashboard
            </Button>
            <Button variant="outline" onClick={() => router.push('/')}>
              Main Oracle
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Reading Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Question Input */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">☯️</span>
                  New I-Ching Reading
                </CardTitle>
                <CardDescription>
                  Enter your question and receive guidance from the ancient Chinese Book of Changes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="What guidance do you seek from the I-Ching? Be specific and sincere in your question..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="min-h-[100px]"
                />
                <Button onClick={getReading} disabled={loading || !question.trim()} className="w-full">
                  {loading ? 'Consulting the I-Ching...' : 'Cast the Coins'}
                </Button>
              </CardContent>
            </Card>

            {/* Reading Results */}
            {loading && (
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-48" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-32 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardContent>
              </Card>
            )}

            {reading && (
              <div className="space-y-6">
                {/* Primary Hexagram */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Primary Hexagram #{reading.number}</CardTitle>
                    <CardDescription>Your current situation and primary guidance</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-6">
                      <div className="text-center">
                        <div className="text-4xl font-mono bg-gray-100 p-4 rounded-lg">
                          {renderGlyphWithLargerCircles(reading.details.glyph)}
                        </div>
                        <p className="text-sm text-gray-600 mt-2">Hexagram Glyph</p>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">{reading.details.english}</h3>
                        <p className="text-gray-700 mb-4">{reading.details.interpretation}</p>
                        {reading.details.trigrams && (
                          <div className="space-y-2">
                            <h4 className="font-medium">Trigram Composition:</h4>
                            <div className="text-sm text-gray-600">
                              <p><strong>Upper:</strong> {parseIfaNames(reading.details.trigrams).upper}</p>
                              <p><strong>Lower:</strong> {parseIfaNames(reading.details.trigrams).lower}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Changing Lines */}
                {reading.hasChanging && reading.changingLineDetails.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">Changing Lines</CardTitle>
                      <CardDescription>Lines in transition - pay special attention to these</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {reading.changingLineDetails.map((line, index) => (
                        <div key={index} className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary">Line {line.line}</Badge>
                          </div>
                          <p className="text-sm text-gray-700 mb-2">{line.text}</p>
                          <p className="text-sm text-gray-600 italic">{line.comments}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}

                {/* Transformed Hexagram */}
                {reading.transformedNumber && reading.transformedDetails && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">Transformed Hexagram #{reading.transformedNumber}</CardTitle>
                      <CardDescription>The future situation after changes occur</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start gap-6">
                        <div className="text-center">
                          <div className="text-4xl font-mono bg-gray-100 p-4 rounded-lg">
                            {renderGlyphWithLargerCircles(reading.transformedDetails.glyph)}
                          </div>
                          <p className="text-sm text-gray-600 mt-2">Transformed Glyph</p>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-2">{reading.transformedDetails.english}</h3>
                          <p className="text-gray-700">{reading.transformedDetails.interpretation}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  📚 Study Hexagrams
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  🔄 Random Hexagram
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  📖 I-Ching Wisdom
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  💾 Export Reading
                </Button>
              </CardContent>
            </Card>

            {/* Reading History */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Readings</CardTitle>
                <CardDescription>Your consultation history</CardDescription>
              </CardHeader>
              <CardContent>
                {history.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-4">
                    No readings yet. Cast your first consultation above.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {history.slice(0, 5).map((item, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg text-sm cursor-pointer hover:bg-gray-100">
                        <p className="font-medium">Hexagram {item.number}</p>
                        <p className="text-gray-600 truncate">{item.question}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {item.hasChanging ? 'With changing lines' : 'Static'}
                        </p>
                      </div>
                    ))}
                    {history.length > 5 && (
                      <Button variant="ghost" size="sm" className="w-full">
                        View All ({history.length})
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Total Readings:</span>
                  <span className="font-medium">{history.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>With Changing Lines:</span>
                  <span className="font-medium">
                    {history.filter(r => r.hasChanging).length}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Most Consulted:</span>
                  <span className="font-medium">-</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
