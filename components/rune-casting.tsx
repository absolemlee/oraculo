'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import type { RuneReading, SingleRuneReading, NornsRuneReading } from '@/pages/api/rune-reading';

export function RuneCasting() {
  const [question, setQuestion] = useState('');
  const [reading, setReading] = useState<RuneReading | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [castingType, setCastingType] = useState<'single' | 'norns'>('single');

  const castRune = async (type: 'single' | 'norns') => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/rune-reading', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          question: question.trim() || undefined,
          type 
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to cast rune');
      }

      const runeReading: RuneReading = await response.json();
      setReading(runeReading);
      setCastingType(type);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const resetReading = () => {
    setReading(null);
    setQuestion('');
    setError(null);
  };

  // Component to render a single rune
  const RuneDisplay = ({ 
    rune, 
    reversed, 
    position 
  }: { 
    rune: any; 
    reversed: boolean; 
    position?: string 
  }) => (
    <div className="text-center space-y-2">
      {position && (
        <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          {position}
        </h4>
      )}
      <div className="relative inline-block">
        <div 
          className={`text-6xl font-bold transition-transform duration-500 ${
            reversed ? 'rotate-180' : ''
          }`}
          style={{ fontFamily: 'serif' }}
        >
          {rune.symbol}
        </div>
        {reversed && (
          <Badge variant="secondary" className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 text-xs">
            Reversed
          </Badge>
        )}
      </div>
      <div>
        <h5 className="font-semibold">{rune.name}</h5>
        <p className="text-xs text-muted-foreground">{rune.meaning}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {!reading ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">ᚱᚢᚾᚨ</span>
              Cast the Runes
            </CardTitle>
            <CardDescription>
              Choose between a single rune for immediate guidance or the Norns spread 
              (Past, Present, Future) for deeper insight into your life's timeline.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label htmlFor="question" className="text-sm font-medium">
                Your Question (Optional)
              </label>
              <Textarea
                id="question"
                placeholder="What guidance do you seek from the runes? Focus your mind on your question..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="mt-2"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Single Rune Casting */}
              <Card className="border-2 hover:border-primary/50 transition-colors cursor-pointer">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Single Rune</CardTitle>
                  <CardDescription className="text-sm">
                    Draw one rune for immediate guidance and insight
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => castRune('single')} 
                    disabled={isLoading}
                    className="w-full"
                    variant="outline"
                  >
                    {isLoading && castingType === 'single' ? 'Casting...' : 'Cast Single Rune'}
                  </Button>
                </CardContent>
              </Card>

              {/* Norns Spread Casting */}
              <Card className="border-2 hover:border-primary/50 transition-colors cursor-pointer">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">The Norns Spread</CardTitle>
                  <CardDescription className="text-sm">
                    Past, Present, Future - Three runes for timeline guidance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => castRune('norns')} 
                    disabled={isLoading}
                    className="w-full"
                  >
                    {isLoading && castingType === 'norns' ? 'Casting...' : 'Cast Norns Spread'}
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="bg-muted/30 p-4 rounded-lg">
              <h4 className="font-medium mb-2">About Rune Casting:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• <strong>Single Rune:</strong> Quick guidance for immediate questions</li>
                <li>• <strong>Norns Spread:</strong> Named after the three Norse goddesses of fate</li>
                <li>• Each rune is drawn sequentially without replacement</li>
                <li>• Runes can appear upright or reversed with different meanings</li>
                <li>• Focus on your question while the runes are drawn</li>
              </ul>
            </div>

            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}
          </CardContent>
        </Card>
      ) : reading.type === 'single' ? (
        // Single Rune Reading Display
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Your Rune Reading</CardTitle>
              <Button variant="outline" onClick={resetReading}>
                Cast Another
              </Button>
            </div>
            {reading.question && (
              <CardDescription>
                Question: "{reading.question}"
              </CardDescription>
            )}
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Single Rune Display */}
            <div className="text-center space-y-4">
              <div className="relative inline-block">
                <div 
                  className={`text-8xl font-bold transition-transform duration-500 ${
                    reading.reversed ? 'rotate-180' : ''
                  }`}
                  style={{ fontFamily: 'serif' }}
                >
                  {reading.rune.symbol}
                </div>
                {reading.reversed && (
                  <Badge variant="secondary" className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    Reversed
                  </Badge>
                )}
              </div>
              
              <div>
                <h3 className="text-2xl font-bold">{reading.rune.name}</h3>
                <p className="text-muted-foreground">{reading.rune.meaning}</p>
              </div>
            </div>

            <Separator />

            {/* Rune Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Attributes</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Aett:</span>
                    <Badge variant="outline" className="capitalize">
                      {reading.rune.aett}
                    </Badge>
                  </div>
                  {reading.rune.element && (
                    <div className="flex justify-between">
                      <span>Element:</span>
                      <Badge variant="outline">
                        {reading.rune.element}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Keywords</h4>
                <div className="flex flex-wrap gap-1">
                  {reading.rune.keywords.map((keyword) => (
                    <Badge key={keyword} variant="secondary" className="text-xs">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <Separator />

            {/* Description */}
            <div>
              <h4 className="font-semibold mb-2">Meaning</h4>
              <p className="text-sm text-muted-foreground">
                {reading.rune.description}
              </p>
            </div>

            <Separator />

            {/* Interpretation */}
            <div>
              <h4 className="font-semibold mb-2">
                {reading.reversed ? 'Reversed ' : ''}Interpretation
              </h4>
              <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                <p className="text-sm leading-relaxed">
                  {reading.interpretation}
                </p>
              </div>
            </div>

            {/* Timestamp */}
            <div className="text-xs text-muted-foreground text-center">
              Cast on {new Date(reading.timestamp).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      ) : (
        // Norns Spread Reading Display
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>The Norns Spread</CardTitle>
              <Button variant="outline" onClick={resetReading}>
                Cast Another
              </Button>
            </div>
            <CardDescription>
              Past • Present • Future
              {reading.question && (
                <span className="block mt-1">Question: "{reading.question}"</span>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Three Runes Display */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <RuneDisplay 
                rune={reading.spread.past.rune} 
                reversed={reading.spread.past.reversed}
                position="Past" 
              />
              <RuneDisplay 
                rune={reading.spread.present.rune} 
                reversed={reading.spread.present.reversed}
                position="Present" 
              />
              <RuneDisplay 
                rune={reading.spread.future.rune} 
                reversed={reading.spread.future.reversed}
                position="Future" 
              />
            </div>

            <Separator />

            {/* Overall Guidance */}
            <div>
              <h4 className="font-semibold mb-3">The Norns' Guidance</h4>
              <div className="bg-primary/5 p-4 rounded-lg border border-primary/10 mb-4">
                <p className="text-sm leading-relaxed">
                  {reading.overallGuidance}
                </p>
              </div>
            </div>

            <Separator />

            {/* Individual Interpretations */}
            <div className="space-y-4">
              <h4 className="font-semibold">Individual Rune Meanings</h4>
              
              {[
                { key: 'past', title: 'Past - What Shaped You', data: reading.spread.past },
                { key: 'present', title: 'Present - Current Energies', data: reading.spread.present },
                { key: 'future', title: 'Future - Path Ahead', data: reading.spread.future }
              ].map(({ key, title, data }) => (
                <div key={key} className="border rounded-lg p-4">
                  <h5 className="font-medium mb-2">{title}</h5>
                  <div className="text-sm space-y-2">
                    <p className="font-medium">
                      {data.rune.name} ({data.rune.meaning})
                      {data.reversed && <span className="text-muted-foreground"> - Reversed</span>}
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      {data.interpretation}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Timestamp */}
            <div className="text-xs text-muted-foreground text-center">
              Cast on {new Date(reading.timestamp).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
