// API endpoint for Tarot card readings
import type { NextApiRequest, NextApiResponse } from 'next';
import { 
  drawSingleTarotCard,
  drawTarotCardsWithoutReplacement,
  drawTarotSpread,
  tarotSpreads,
  TarotCard,
  TarotSpread
} from '../../resources/tarot/tarot';

// Response interfaces
interface SingleTarotReading {
  type: 'single';
  card: TarotCard;
  reversed: boolean;
  interpretation: string;
  guidance: string;
  timestamp: string;
}

interface SpreadTarotReading {
  type: 'spread';
  spreadName: string;
  spread: TarotSpread;
  cards: Array<{
    position: string;
    card: TarotCard;
    reversed: boolean;
    interpretation: string;
  }>;
  overallGuidance: string;
  timestamp: string;
}

interface CustomTarotReading {
  type: 'custom';
  cardCount: number;
  cards: Array<{
    card: TarotCard;
    reversed: boolean;
    interpretation: string;
  }>;
  overallGuidance: string;
  timestamp: string;
}

type TarotReadingResponse = SingleTarotReading | SpreadTarotReading | CustomTarotReading;

// Generate contextual interpretation for a card
function generateCardInterpretation(card: TarotCard, reversed: boolean, position?: string): string {
  const meaning = reversed ? card.divination.reversed : card.divination.upright;
  const positionContext = position ? ` In the ${position} position, this suggests ` : 'This card suggests ';
  
  return `${positionContext}${meaning.toLowerCase()}. ${card.keywords.join(', ')} are key themes here.`;
}

// Generate overall guidance for multiple cards
function generateOverallGuidance(cards: Array<{ card: TarotCard; reversed: boolean }>): string {
  const majorArcanaCount = cards.filter(({ card }) => card.arcana === 'major').length;
  const reversedCount = cards.filter(({ reversed }) => reversed).length;
  
  let guidance = '';
  
  if (majorArcanaCount > cards.length / 2) {
    guidance += 'The predominance of Major Arcana cards suggests this situation involves significant life lessons and spiritual growth. ';
  }
  
  if (reversedCount > cards.length / 2) {
    guidance += 'Many reversed cards indicate internal conflicts or blocked energy that needs attention. ';
  }
  
  guidance += 'Consider how these cards work together to tell your story and guide your path forward.';
  
  return guidance;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<TarotReadingResponse | { error: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { readingType, spreadName, cardCount } = req.body;

    const timestamp = new Date().toISOString();

    switch (readingType) {
      case 'single': {
        const { card, reversed } = drawSingleTarotCard();
        const interpretation = generateCardInterpretation(card, reversed);
        const guidance = `Focus on the energy of ${card.name}. ${reversed ? 'The reversed position suggests looking inward or working through challenges.' : 'The upright position encourages embracing this energy fully.'}`;

        const reading: SingleTarotReading = {
          type: 'single',
          card,
          reversed,
          interpretation,
          guidance,
          timestamp
        };

        return res.status(200).json(reading);
      }

      case 'spread': {
        if (!spreadName || !tarotSpreads.find(s => s.name === spreadName)) {
          return res.status(400).json({ error: 'Invalid or missing spread name' });
        }

        const spreadResult = drawTarotSpread(spreadName);
        const spread = tarotSpreads.find(s => s.name === spreadName)!;
        
        const cards = spreadResult.map(({ position, card, reversed }) => ({
          position,
          card,
          reversed,
          interpretation: generateCardInterpretation(card, reversed, position)
        }));

        const overallGuidance = generateOverallGuidance(cards.map(({ card, reversed }) => ({ card, reversed })));

        const reading: SpreadTarotReading = {
          type: 'spread',
          spreadName,
          spread,
          cards,
          overallGuidance,
          timestamp
        };

        return res.status(200).json(reading);
      }

      case 'custom': {
        const count = Math.min(Math.max(cardCount || 3, 1), 10); // Between 1-10 cards
        const drawnCards = drawTarotCardsWithoutReplacement(count);
        
        const cards = drawnCards.map(({ card, reversed }, index) => ({
          card,
          reversed,
          interpretation: generateCardInterpretation(card, reversed, `Card ${index + 1}`)
        }));

        const overallGuidance = generateOverallGuidance(cards.map(({ card, reversed }) => ({ card, reversed })));

        const reading: CustomTarotReading = {
          type: 'custom',
          cardCount: count,
          cards,
          overallGuidance,
          timestamp
        };

        return res.status(200).json(reading);
      }

      default:
        return res.status(400).json({ error: 'Invalid reading type. Use "single", "spread", or "custom"' });
    }
  } catch (error) {
    console.error('Tarot reading error:', error);
    return res.status(500).json({ error: 'Failed to generate tarot reading' });
  }
}
