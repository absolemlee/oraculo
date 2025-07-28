import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

interface RuneReading {
  type: 'single' | 'norns';
  question: string;
  rune?: {
    name: string;
    meaning: string;
    description: string;
    reversed: boolean;
    reversedMeaning?: string;
    aett: string;
    element: string;
    symbol: string;
  };
  runes?: Array<{
    position: string;
    rune: {
      name: string;
      meaning: string;
      description: string;
      reversed: boolean;
      reversedMeaning?: string;
      aett: string;
      element: string;
      symbol: string;
    };
  }>;
  guidance: string;
  timestamp: string;
}

export default function RunesConsole() {
  const router = useRouter();
  const [question, setQuestion] = useState('');
  const [reading, setReading] = useState<RuneReading | null>(null);
  const [loading, setLoading] = useState(false);
  const [castingType, setCastingType] = useState<'single' | 'norns'>('single');
  const [history, setHistory] = useState<RuneReading[]>([]);

  const getReading = async () => {
    if (!question.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/rune-reading', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          question,
          castingType 
        })
      });
      const data = await response.json();
      setReading(data);
      setHistory(prev => [data, ...prev.slice(0, 9)]); // Keep last 10 readings
    } catch (error) {
      console.error('Error getting rune reading:', error);
    } finally {
      setLoading(false);
    }
  };

  const RuneDisplay = ({ 
    rune, 
    position 
  }: { 
    rune: RuneReading['rune'], 
    position?: string 
  }) => {
    if (!rune) return null;
    
    return (
      <Card className="h-full">
        <CardHeader className="text-center pb-3">
          <div className="text-6xl mb-2 font-serif" style={{ transform: rune.reversed ? 'rotate(180deg)' : 'none' }}>
            {rune.symbol}
          </div>
          <CardTitle className="text-lg">
            {rune.name} {rune.reversed && '(Reversed)'}
          </CardTitle>
          {position && (
            <Badge variant="secondary" className="w-fit mx-auto">
              {position}
            </Badge>
          )}
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-center">
            <Badge variant="outline" className="mb-2">{rune.aett}</Badge>
            <Badge variant="outline" className="mb-2 ml-1">{rune.element}</Badge>
          </div>
          
          <div className="text-sm">
            <strong>Meaning:</strong> {rune.reversed && rune.reversedMeaning ? rune.reversedMeaning : rune.meaning}
          </div>
          
          <div className="text-sm text-gray-600">
            {rune.description}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Elder Futhark Runes Console</h1>
            <p className="text-gray-600 mt-1">Ancient Nordic divination through the 24 Elder Futhark runes</p>
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
                  <span className="text-2xl">ᚱ</span>
                  New Rune Casting
                </CardTitle>
                <CardDescription>
                  Draw from the Elder Futhark for guidance and wisdom
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2 mb-4">
                  <Button 
                    variant={castingType === 'single' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCastingType('single')}
                  >
                    Single Rune
                  </Button>
                  <Button 
                    variant={castingType === 'norns' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCastingType('norns')}
                  >
                    Norns Cast (Past, Present, Future)
                  </Button>
                </div>
                
                <Textarea
                  placeholder={
                    castingType === 'single' 
                      ? "What guidance do you seek from the runes? Ask with focus and intent..."
                      : "What situation would you like the Norns to illuminate? Past, present, and future will be revealed..."
                  }
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="min-h-[100px]"
                />
                <Button onClick={getReading} disabled={loading || !question.trim()} className="w-full">
                  {loading ? 'Drawing runes...' : `Cast ${castingType === 'single' ? 'Single Rune' : 'Norns Spread'}`}
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
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[...Array(castingType === 'single' ? 1 : 3)].map((_, i) => (
                      <div key={i} className="text-center">
                        <Skeleton className="h-20 w-20 mx-auto mb-2" />
                        <Skeleton className="h-4 w-16 mx-auto" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {reading && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Your {reading.type === 'single' ? 'Rune' : 'Norns Cast'}</CardTitle>
                    <CardDescription>
                      Cast at {new Date(reading.timestamp).toLocaleString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {reading.type === 'single' && reading.rune ? (
                      <div className="flex justify-center">
                        <div className="max-w-sm">
                          <RuneDisplay rune={reading.rune} />
                        </div>
                      </div>
                    ) : reading.type === 'norns' && reading.runes ? (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {reading.runes.map((runeReading, index) => (
                          <RuneDisplay 
                            key={index}
                            rune={runeReading.rune}
                            position={runeReading.position}
                          />
                        ))}
                      </div>
                    ) : null}
                  </CardContent>
                </Card>

                {/* Guidance */}
                <Card className="bg-gradient-to-r from-purple-50 to-violet-50">
                  <CardHeader>
                    <CardTitle className="text-purple-700">Runic Guidance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">{reading.guidance}</p>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Runic Tools</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  ᚠ Study Futhark
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  🎲 Random Rune
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  🗿 Aett Explorer
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  💾 Export Reading
                </Button>
              </CardContent>
            </Card>

            {/* Reading History */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Castings</CardTitle>
                <CardDescription>Your runic consultation history</CardDescription>
              </CardHeader>
              <CardContent>
                {history.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-4">
                    No castings yet. Draw your first runes above.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {history.slice(0, 5).map((item, index) => (
                      <div key={index} className="p-3 bg-purple-50 rounded-lg text-sm cursor-pointer hover:bg-purple-100">
                        <p className="font-medium">
                          {item.type === 'single' 
                            ? item.rune?.name 
                            : `${item.runes?.[0]?.rune.name} • ${item.runes?.[1]?.rune.name} • ${item.runes?.[2]?.rune.name}`
                          }
                        </p>
                        <p className="text-gray-600 truncate">{item.question}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {item.type === 'single' ? 'Single cast' : 'Norns spread'}
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

            {/* Rune Wisdom */}
            <Card>
              <CardHeader>
                <CardTitle>Elder Wisdom</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600">
                <p className="italic">
                  "The runes speak not of fate carved in stone, but of currents 
                  that flow through the Web of Wyrd. They guide those who seek 
                  to understand their place in the great pattern."
                </p>
                <p className="mt-2 text-xs text-gray-500">
                  - Norse wisdom tradition
                </p>
              </CardContent>
            </Card>

            {/* Aett Information */}
            <Card>
              <CardHeader>
                <CardTitle>The Three Aetts</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <div className="p-2 border-l-2 border-blue-300">
                  <strong>Freyr's Aett:</strong> Material concerns, beginnings
                </div>
                <div className="p-2 border-l-2 border-red-300">
                  <strong>Hagal's Aett:</strong> Challenges, transformation
                </div>
                <div className="p-2 border-l-2 border-green-300">
                  <strong>Tyr's Aett:</strong> Higher wisdom, spiritual matters
                </div>
              </CardContent>
            </Card>

            {/* Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Total Castings:</span>
                  <span className="font-medium">{history.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Single Runes:</span>
                  <span className="font-medium">
                    {history.filter(r => r.type === 'single').length}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Norns Spreads:</span>
                  <span className="font-medium">
                    {history.filter(r => r.type === 'norns').length}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
