import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

interface HexagramDetails {
  number: number;
  name: string;
  symbol: string;
  description: string;
  interpretation: string;
  lines: Array<{
    number: number;
    description: string;
    interpretation: string;
  }>;
}

export default function HexagramConsole() {
  const router = useRouter();
  const [hexagramNumber, setHexagramNumber] = useState<string>('');
  const [hexagramDetails, setHexagramDetails] = useState<HexagramDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [recentHexagrams, setRecentHexagrams] = useState<number[]>([]);

  const lookupHexagram = async (number?: number) => {
    const numToLookup = number || parseInt(hexagramNumber);
    if (!numToLookup || numToLookup < 1 || numToLookup > 64) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/hexagram/${numToLookup}`);
      const data = await response.json();
      setHexagramDetails(data);
      
      // Add to recent hexagrams
      setRecentHexagrams(prev => [
        numToLookup,
        ...prev.filter(n => n !== numToLookup).slice(0, 9)
      ]);
    } catch (error) {
      console.error('Error fetching hexagram:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRandomHexagram = () => {
    const randomNum = Math.floor(Math.random() * 64) + 1;
    setHexagramNumber(randomNum.toString());
    lookupHexagram(randomNum);
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Hexagram Lookup Console</h1>
            <p className="text-gray-600 mt-1">Study and explore all 64 I-Ching hexagrams in detail</p>
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
          {/* Main Lookup Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Lookup Input */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">📖</span>
                  Hexagram Lookup
                </CardTitle>
                <CardDescription>
                  Enter a hexagram number (1-64) to study its meaning and structure
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    type="number"
                    min="1"
                    max="64"
                    placeholder="Enter hexagram number (1-64)"
                    value={hexagramNumber}
                    onChange={(e) => setHexagramNumber(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && lookupHexagram()}
                  />
                  <Button onClick={() => lookupHexagram()} disabled={loading}>
                    {loading ? 'Loading...' : 'Lookup'}
                  </Button>
                </div>
                <Button variant="outline" onClick={getRandomHexagram} className="w-full">
                  🎲 Random Hexagram
                </Button>
              </CardContent>
            </Card>

            {/* Loading State */}
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

            {/* Hexagram Details */}
            {hexagramDetails && (
              <div className="space-y-6">
                {/* Main Hexagram Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">
                      Hexagram #{hexagramDetails.number}: {hexagramDetails.name}
                    </CardTitle>
                    <CardDescription>Classical Chinese interpretation and meaning</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-6">
                      <div className="text-center">
                        <div className="text-6xl font-mono bg-gray-100 p-6 rounded-lg">
                          {hexagramDetails.symbol}
                        </div>
                        <p className="text-sm text-gray-600 mt-2">Hexagram Symbol</p>
                        <Badge variant="secondary" className="mt-1">
                          #{hexagramDetails.number}
                        </Badge>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-3">{hexagramDetails.name}</h3>
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-medium text-gray-900">Description:</h4>
                            <p className="text-gray-700">{hexagramDetails.description}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">Interpretation:</h4>
                            <p className="text-gray-700">{hexagramDetails.interpretation}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Line Analysis */}
                {hexagramDetails.lines && hexagramDetails.lines.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">Line-by-Line Analysis</CardTitle>
                      <CardDescription>
                        Detailed interpretation of each line (from bottom to top)
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {hexagramDetails.lines.map((line, index) => (
                        <div key={index} className="p-4 bg-teal-50 rounded-lg border-l-4 border-teal-400">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary">Line {line.number}</Badge>
                            <Badge variant="outline">
                              {line.number <= 3 ? 'Lower Trigram' : 'Upper Trigram'}
                            </Badge>
                          </div>
                          <div className="space-y-2 text-sm">
                            <p><strong>Description:</strong> {line.description}</p>
                            <p className="text-gray-600"><strong>Meaning:</strong> {line.interpretation}</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}

                {/* Study Notes */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Study Notes</CardTitle>
                    <CardDescription>Key insights and applications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold text-blue-900 mb-2">Key Themes</h4>
                        <p className="text-blue-700">
                          Focus on the primary energies and movements described in this hexagram.
                        </p>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <h4 className="font-semibold text-green-900 mb-2">Practical Application</h4>
                        <p className="text-green-700">
                          Consider how these principles apply to current life situations.
                        </p>
                      </div>
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <h4 className="font-semibold text-purple-900 mb-2">Meditation Focus</h4>
                        <p className="text-purple-700">
                          Contemplate the deeper spiritual meanings and transformations.
                        </p>
                      </div>
                      <div className="p-3 bg-amber-50 rounded-lg">
                        <h4 className="font-semibold text-amber-900 mb-2">Related Hexagrams</h4>
                        <p className="text-amber-700">
                          Study complementary and opposite hexagrams for fuller understanding.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Navigation */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Navigation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => {setHexagramNumber('1'); lookupHexagram(1);}}>
                  #1 The Creative
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => {setHexagramNumber('2'); lookupHexagram(2);}}>
                  #2 The Receptive
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => {setHexagramNumber('11'); lookupHexagram(11);}}>
                  #11 Peace
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => {setHexagramNumber('12'); lookupHexagram(12);}}>
                  #12 Standstill
                </Button>
                <Separator />
                <Button variant="ghost" size="sm" className="w-full">
                  📚 Browse All 64
                </Button>
              </CardContent>
            </Card>

            {/* Recent Hexagrams */}
            <Card>
              <CardHeader>
                <CardTitle>Recently Viewed</CardTitle>
                <CardDescription>Your lookup history</CardDescription>
              </CardHeader>
              <CardContent>
                {recentHexagrams.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-4">
                    No hexagrams viewed yet. Start exploring above.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {recentHexagrams.map((num, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => {
                          setHexagramNumber(num.toString());
                          lookupHexagram(num);
                        }}
                      >
                        #{num}
                      </Button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Study Tools */}
            <Card>
              <CardHeader>
                <CardTitle>Study Tools</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  📝 Take Notes
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  🔖 Bookmark
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  📤 Share Link
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  🖨️ Print View
                </Button>
              </CardContent>
            </Card>

            {/* I-Ching Wisdom */}
            <Card>
              <CardHeader>
                <CardTitle>I-Ching Teaching</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600">
                <p className="italic">
                  "The I-Ching teaches us that change is the only constant. 
                  By understanding the patterns of transformation, we learn 
                  to flow with life's rhythms rather than resist them."
                </p>
                <p className="mt-2 text-xs text-gray-500">
                  - Traditional Chinese wisdom
                </p>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Your Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Hexagrams Studied:</span>
                  <span className="font-medium">{recentHexagrams.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Completion:</span>
                  <span className="font-medium">{Math.round((recentHexagrams.length / 64) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-emerald-500 h-2 rounded-full transition-all"
                    style={{ width: `${(recentHexagrams.length / 64) * 100}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
