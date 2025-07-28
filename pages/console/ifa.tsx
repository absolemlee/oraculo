import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

interface IfaReading {
  question: string;
  hexagram: {
    number: number;
    symbol: string;
    english: string;
  };
  ifa: {
    primary: string;
    primaryGlyph: string;
  };
  changingLines: Array<{
    line: number;
    text: string;
  }> | null;
  transformed: {
    hexagram: {
      number: number;
      symbol: string;
      english: string;
    };
    ifa: {
      secondary: string;
      secondaryGlyph: string;
    };
  } | null;
}

export default function IfaConsole() {
  const router = useRouter();
  const [question, setQuestion] = useState('');
  const [reading, setReading] = useState<IfaReading | null>(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<IfaReading[]>([]);

  const getReading = async () => {
    if (!question.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/ifa-reading', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question })
      });
      const data = await response.json();
      setReading(data);
      setHistory(prev => [data, ...prev.slice(0, 9)]); // Keep last 10 readings
    } catch (error) {
      console.error('Error getting Ifá reading:', error);
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

  const parseIfaGlyph = (glyph: string) => {
    const parts = glyph.split('\n---\n');
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Ifá Correspondence Console</h1>
            <p className="text-gray-600 mt-1">Yoruba wisdom tradition through I-Ching hexagram correspondences</p>
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
                  <span className="text-2xl">🔥</span>
                  New Ifá Consultation
                </CardTitle>
                <CardDescription>
                  Seek guidance from Ifá wisdom tradition through I-Ching correspondences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="What guidance do you seek from Ifá? Present your question with respect and sincerity..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="min-h-[100px]"
                />
                <Button onClick={getReading} disabled={loading || !question.trim()} className="w-full">
                  {loading ? 'Consulting Ifá...' : 'Cast the Opele'}
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
                {/* Primary Odu */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Primary Odu: {reading.ifa.primary}</CardTitle>
                    <CardDescription>
                      Hexagram #{reading.hexagram.number} - {reading.hexagram.english}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* I-Ching Representation */}
                      <div className="text-center">
                        <h4 className="font-medium mb-2">I-Ching Hexagram</h4>
                        <div className="text-4xl font-mono bg-gray-100 p-4 rounded-lg">
                          {reading.hexagram.symbol}
                        </div>
                        <p className="text-sm text-gray-600 mt-2">{reading.hexagram.english}</p>
                      </div>
                      
                      {/* Ifá Representation */}
                      <div className="text-center">
                        <h4 className="font-medium mb-2">Ifá Odu Pattern</h4>
                        <div className="text-2xl font-mono bg-amber-100 p-4 rounded-lg leading-tight">
                          {renderGlyphWithLargerCircles(reading.ifa.primaryGlyph)}
                        </div>
                        <p className="text-sm text-gray-600 mt-2">{reading.ifa.primary}</p>
                      </div>
                    </div>

                    {/* Trigram Breakdown */}
                    <div className="border-t pt-4">
                      <h4 className="font-medium mb-3">Odu Composition</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <strong>Upper Trigram (Heaven):</strong>
                          <div className="mt-1 p-2 bg-amber-50 rounded">
                            {parseIfaNames(reading.ifa.primary).upper}
                          </div>
                        </div>
                        <div>
                          <strong>Lower Trigram (Earth):</strong>
                          <div className="mt-1 p-2 bg-amber-50 rounded">
                            {parseIfaNames(reading.ifa.primary).lower}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Changing Lines */}
                {reading.changingLines && reading.changingLines.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">Changing Lines - Ebo Required</CardTitle>
                      <CardDescription>Lines requiring attention and sacrifice</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {reading.changingLines.map((line, index) => (
                        <div key={index} className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-400">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary">Line {line.line}</Badge>
                            <Badge variant="outline">Ebo Needed</Badge>
                          </div>
                          <p className="text-sm text-gray-700">{line.text}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}

                {/* Transformed Odu */}
                {reading.transformed && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">
                        Secondary Odu: {reading.transformed.ifa.secondary}
                      </CardTitle>
                      <CardDescription>
                        Future manifestation after Ebo - Hexagram #{reading.transformed.hexagram.number}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* I-Ching Representation */}
                        <div className="text-center">
                          <h4 className="font-medium mb-2">Transformed Hexagram</h4>
                          <div className="text-4xl font-mono bg-gray-100 p-4 rounded-lg">
                            {reading.transformed.hexagram.symbol}
                          </div>
                          <p className="text-sm text-gray-600 mt-2">{reading.transformed.hexagram.english}</p>
                        </div>
                        
                        {/* Ifá Representation */}
                        <div className="text-center">
                          <h4 className="font-medium mb-2">Secondary Odu</h4>
                          <div className="text-2xl font-mono bg-green-100 p-4 rounded-lg leading-tight">
                            {renderGlyphWithLargerCircles(reading.transformed.ifa.secondaryGlyph)}
                          </div>
                          <p className="text-sm text-gray-600 mt-2">{reading.transformed.ifa.secondary}</p>
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
                <CardTitle>Ifá Tools</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  📿 Study Odu
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  🔥 Ebo Guidance
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  🌍 Orisha Connection
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  💾 Export Reading
                </Button>
              </CardContent>
            </Card>

            {/* Reading History */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Consultations</CardTitle>
                <CardDescription>Your Ifá reading history</CardDescription>
              </CardHeader>
              <CardContent>
                {history.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-4">
                    No consultations yet. Cast your first Ifá reading above.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {history.slice(0, 5).map((item, index) => (
                      <div key={index} className="p-3 bg-amber-50 rounded-lg text-sm cursor-pointer hover:bg-amber-100">
                        <p className="font-medium">{item.ifa.primary}</p>
                        <p className="text-gray-600 truncate">{item.question}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Hex #{item.hexagram.number} • {item.changingLines ? 'Ebo required' : 'Stable'}
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

            {/* Ifá Wisdom */}
            <Card>
              <CardHeader>
                <CardTitle>Ifá Teaching</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600">
                <p className="italic">
                  "Ifá teaches us that the universe operates through dynamic balance. 
                  Each Odu reveals both challenge and opportunity, requiring wisdom 
                  to navigate life's complexities."
                </p>
                <p className="mt-2 text-xs text-gray-500">
                  - Traditional Ifá wisdom
                </p>
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
                  <span>Ebo Required:</span>
                  <span className="font-medium">
                    {history.filter(r => r.changingLines && r.changingLines.length > 0).length}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Most Common Odu:</span>
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
