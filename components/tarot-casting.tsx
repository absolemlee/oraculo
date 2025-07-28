import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Skeleton } from './ui/skeleton';

interface TarotCard {
  id: number;
  name: string;
  suit?: string;
  arcana: 'major' | 'minor';
  keywords: string[];
  description: string;
  symbolism: string[];
  divination: {
    upright: string;
    reversed: string;
  };
  unicode?: string;
  imageUrl?: string;
}

interface TarotReading {
  type: 'single' | 'spread' | 'custom';
  card?: TarotCard;
  reversed?: boolean;
  cards?: Array<{
    position?: string;
    card: TarotCard;
    reversed: boolean;
    interpretation: string;
  }>;
  spreadName?: string;
  interpretation?: string;
  guidance?: string;
  overallGuidance?: string;
  timestamp: string;
}

interface TarotSpread {
  name: string;
  positions: string[];
  description: string;
}

const availableSpreads: TarotSpread[] = [
  {
    name: "Single Card",
    positions: ["Present Situation"],
    description: "A simple one-card draw for daily guidance or quick insight."
  },
  {
    name: "Three-Card Spread",
    positions: ["Past", "Present", "Future"],
    description: "The classic past-present-future spread for understanding timeline and progression."
  },
  {
    name: "Celtic Cross",
    positions: [
      "Present Situation", "Challenge/Cross", "Distant Past/Foundation", 
      "Recent Past", "Possible Outcome", "Immediate Future", 
      "Your Approach", "External Influences", "Hopes and Fears", "Final Outcome"
    ],
    description: "The most comprehensive 10-card spread for deep life questions and complex situations."
  },
  {
    name: "Relationship Spread",
    positions: ["You", "Partner", "Relationship Dynamic", "Challenge", "Outcome"],
    description: "A 5-card spread specifically designed for relationship questions and dynamics."
  }
];

export default function TarotCasting() {
  const [reading, setReading] = useState<TarotReading | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSpread, setSelectedSpread] = useState<string>('Single Card');
  const [customCardCount, setCustomCardCount] = useState(3);

  const castTarot = async (readingType: 'single' | 'spread' | 'custom') => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/tarot-reading', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          readingType,
          spreadName: readingType === 'spread' ? selectedSpread : undefined,
          cardCount: readingType === 'custom' ? customCardCount : undefined,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch tarot reading');
      }

      const data = await response.json();
      setReading(data);
    } catch (error) {
      console.error('Error fetching tarot reading:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const TarotCardDisplay = ({ 
    card, 
    reversed, 
    position, 
    interpretation 
  }: { 
    card: TarotCard; 
    reversed: boolean; 
    position?: string;
    interpretation?: string;
  }) => (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader className="text-center">
        <div className="mb-2">
          {card.imageUrl ? (
            <img 
              src={card.imageUrl} 
              alt={card.name}
              className={`w-32 h-48 mx-auto object-cover rounded border ${reversed ? 'transform rotate-180' : ''}`}
              onError={(e) => {
                // Fallback to Unicode if image fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.nextElementSibling?.classList.remove('hidden');
              }}
            />
          ) : null}
          <div className={`text-6xl ${card.imageUrl ? 'hidden' : ''} ${reversed ? 'transform rotate-180' : ''}`}>
            {card.unicode || '🔮'}
          </div>
        </div>
        <CardTitle className="text-lg">
          {card.name} {reversed && '(Reversed)'}
        </CardTitle>
        {position && (
          <Badge variant="secondary" className="w-fit mx-auto">
            {position}
          </Badge>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex flex-wrap gap-1 justify-center">
            {card.keywords.map((keyword, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {keyword}
              </Badge>
            ))}
          </div>
          
          <div className="text-sm text-gray-600 dark:text-gray-300">
            <strong>Meaning:</strong> {reversed ? card.divination.reversed : card.divination.upright}
          </div>

          {interpretation && (
            <div className="text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 p-2 rounded">
              <strong>Interpretation:</strong> {interpretation}
            </div>
          )}

          <details className="text-sm">
            <summary className="cursor-pointer font-medium text-gray-700 dark:text-gray-300">
              Card Details
            </summary>
            <div className="mt-2 space-y-2 text-gray-600 dark:text-gray-400">
              <p><strong>Description:</strong> {card.description}</p>
              <p><strong>Symbolism:</strong> {card.symbolism.join(', ')}</p>
              <div className="flex gap-2 text-xs">
                <Badge variant="secondary">{card.arcana} arcana</Badge>
                {card.suit && <Badge variant="secondary">{card.suit}</Badge>}
              </div>
            </div>
          </details>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Tarot Reading</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Discover insights through the ancient wisdom of the Tarot cards
        </p>
      </div>

      {!reading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Single Card Reading */}
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Single Card</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Draw one card for daily guidance or a quick insight into your current situation.
              </p>
              <Button 
                onClick={() => castTarot('single')} 
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? 'Drawing...' : 'Draw Single Card'}
              </Button>
            </CardContent>
          </Card>

          {/* Spread Reading */}
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Tarot Spread</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Choose Spread:</label>
                <select 
                  value={selectedSpread}
                  onChange={(e) => setSelectedSpread(e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600"
                >
                  {availableSpreads.map((spread) => (
                    <option key={spread.name} value={spread.name}>
                      {spread.name} ({spread.positions.length} cards)
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  {availableSpreads.find(s => s.name === selectedSpread)?.description}
                </p>
              </div>
              <Button 
                onClick={() => castTarot('spread')} 
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? 'Drawing...' : `Draw ${selectedSpread}`}
              </Button>
            </CardContent>
          </Card>

          {/* Custom Reading */}
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Custom Reading</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Number of Cards:</label>
                <input 
                  type="number"
                  min="1"
                  max="10"
                  value={customCardCount}
                  onChange={(e) => setCustomCardCount(Math.min(10, Math.max(1, parseInt(e.target.value) || 3)))}
                  className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Choose between 1-10 cards for a personalized reading.
                </p>
              </div>
              <Button 
                onClick={() => castTarot('custom')} 
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? 'Drawing...' : `Draw ${customCardCount} Cards`}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-48 w-32 mx-auto" />
                <Skeleton className="h-6 w-24 mx-auto" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mx-auto" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {reading && (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-2">
              Your {reading.type === 'single' ? 'Card' : 
                   reading.type === 'spread' ? `${reading.spreadName}` : 
                   'Custom Reading'}
            </h3>
            <p className="text-sm text-gray-500">
              Cast at {new Date(reading.timestamp).toLocaleString()}
            </p>
          </div>

          {reading.type === 'single' && reading.card && (
            <div className="flex justify-center">
              <TarotCardDisplay 
                card={reading.card} 
                reversed={reading.reversed || false}
                interpretation={reading.interpretation}
              />
            </div>
          )}

          {(reading.type === 'spread' || reading.type === 'custom') && reading.cards && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {reading.cards.map((cardReading, index) => (
                <TarotCardDisplay 
                  key={index}
                  card={cardReading.card}
                  reversed={cardReading.reversed}
                  position={cardReading.position}
                  interpretation={cardReading.interpretation}
                />
              ))}
            </div>
          )}

          {(reading.guidance || reading.overallGuidance) && (
            <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
              <CardHeader>
                <CardTitle className="text-center text-purple-700 dark:text-purple-300">
                  Guidance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-700 dark:text-gray-300 leading-relaxed">
                  {reading.guidance || reading.overallGuidance}
                </p>
              </CardContent>
            </Card>
          )}

          <div className="text-center">
            <Button 
              onClick={() => setReading(null)}
              variant="outline"
            >
              Cast Another Reading
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
