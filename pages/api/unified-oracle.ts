// Unified Oracle API - Comprehensive divination reading combining Runes, Tarot, and I-Ching/Ifá
import type { NextApiRequest, NextApiResponse } from 'next';
import { 
  drawRunesWithoutReplacement,
  elderFutharkRunes,
  Rune 
} from '../../resources/runes/runes';
import { 
  drawSingleTarotCard,
  TarotCard 
} from '../../resources/tarot/tarot';

// Interface for the unified oracle reading response
interface UnifiedOracleReading {
  question: string;
  timestamp: string;
  generalOutlook: {
    type: 'norns_spread';
    past: {
      rune: Rune;
      reversed: boolean;
      interpretation: string;
    };
    present: {
      rune: Rune;
      reversed: boolean;
      interpretation: string;
    };
    future: {
      rune: Rune;
      reversed: boolean;
      interpretation: string;
    };
    overallGuidance: string;
  };
  currentPath: {
    type: 'tarot_card';
    card: TarotCard;
    reversed: boolean;
    interpretation: string;
    guidance: string;
  };
  pathOfResolution: {
    type: 'hexagram_with_ifa';
    hexagram: {
      number: number;
      name: string;
      symbol: string;
      glyph: string;
      english: string;
      interpretation: string;
      trigrams?: string;
    };
    ifa: {
      primary: string;
      primaryGlyph: string;
      composition: {
        upper: string;
        lower: string;
      };
    };
    changingLines: Array<{
      line: number;
      text: string;
      comments: string;
    }> | null;
    transformed?: {
      hexagram: {
        number: number;
        name: string;
        symbol: string;
        english: string;
      };
      ifa: {
        secondary: string;
        secondaryGlyph: string;
      };
    } | null;
    guidance: string;
  };
  synthesis: {
    keyThemes: string[];
    overallMessage: string;
    actionSteps: string[];
    timing: string;
  };
}

// Generate rune interpretation based on position and context
function generateRuneInterpretation(rune: Rune, reversed: boolean, position: string, question: string): string {
  const meaning = reversed ? rune.divination.reversed : rune.divination.upright;
  
  const positionContext = {
    'past': 'In your past, the events that shaped your current situation',
    'present': 'In your present moment, the energies that currently influence you',
    'future': 'In your future potential, the likely outcome if current trends continue'
  };

  return `${positionContext[position as keyof typeof positionContext]} are represented by ${rune.name}${reversed ? ' (Reversed)' : ''}. ${meaning} This ancient Nordic wisdom speaks to the ${rune.element?.toLowerCase() || 'spiritual'} aspects of your situation, particularly regarding ${rune.keywords.slice(0, 2).join(' and ')}.`;
}

// Helper function to get I-Ching reading for resolution path
async function getResolutionReading(question: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:4545'}/api/reading`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question })
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching I-Ching reading:', error);
    return null;
  }
}

// Helper function to get Ifá correspondence
async function getIfaReading(question: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:4545'}/api/ifa-reading`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question })
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching Ifá reading:', error);
    return null;
  }
}

// Generate comprehensive interpretation for Tarot card in context
function generateTarotPathInterpretation(card: TarotCard, reversed: boolean, context: 'current_path'): string {
  const meaning = reversed ? card.divination.reversed : card.divination.upright;
  
  return `Your current path is illuminated by ${card.name}${reversed ? ' (Reversed)' : ''}. ${meaning} This card suggests that your present journey involves ${card.keywords.slice(0, 3).join(', ')}. The energies of ${card.arcana === 'major' ? 'major life lessons' : `the ${card.suit} suit (${card.element})`} are particularly relevant to your current situation.`;
}

// Generate synthesis of all three readings
function generateSynthesis(
  nornsReading: any,
  tarotReading: any,
  hexagramReading: any
): {
  keyThemes: string[];
  overallMessage: string;
  actionSteps: string[];
  timing: string;
} {
  // Extract key themes from all three systems
  const runeThemes = [nornsReading.past.rune.element, nornsReading.present.rune.element, nornsReading.future.rune.element];
  const tarotThemes = tarotReading.card.keywords.slice(0, 2);
  const hexagramThemes = ['transformation', 'wisdom', 'balance']; // Simplified for now

  const keyThemes = [...new Set([...runeThemes, ...tarotThemes, ...hexagramThemes])].slice(0, 5);

  const overallMessage = `The cosmic currents reveal a powerful alignment across all wisdom traditions. Your past (${nornsReading.past.rune.name}) has laid the foundation for your present path (${tarotReading.card.name}), which is leading toward the resolution embodied in Hexagram ${hexagramReading.number}: ${hexagramReading.details.english}. This is a time of ${keyThemes[0]} and ${keyThemes[1]}, where ancient wisdom guides modern choices.`;

  const actionSteps = [
    `Honor the lessons of ${nornsReading.past.rune.name} from your past`,
    `Embrace the energy of ${tarotReading.card.name} in your current situation`,
    `Prepare for the transformation indicated by ${hexagramReading.details.english}`,
    hexagramReading.hasChanging ? 'Pay special attention to the changing lines for timing' : 'Maintain stability as this hexagram suggests a static period'
  ];

  const timing = hexagramReading.hasChanging 
    ? 'Change is imminent - expect shifts within the current cycle'
    : 'This is a time for patience and steady progress';

  return {
    keyThemes,
    overallMessage,
    actionSteps,
    timing
  };
}

// Parse Ifá names helper
function parseIfaNames(combinedName: string) {
  const parts = combinedName.split(' + ');
  return {
    lower: parts[0] || parts[1],
    upper: parts[1] || parts[0]
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UnifiedOracleReading | { error: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { question } = req.body;

    if (!question || typeof question !== 'string') {
      return res.status(400).json({ error: 'Question is required and must be a string' });
    }

    const timestamp = new Date().toISOString();

    // 1. General Outlook - Norns Rune Spread (Past, Present, Future)
    const nornsRunes = drawRunesWithoutReplacement(3);
    const nornsInterpretations = nornsRunes.map((rune, index) => {
      const positions = ['past', 'present', 'future'];
      const position = positions[index];
      const reversed = Math.random() < 0.5; // 50% chance of reversal
      return {
        position,
        rune,
        reversed,
        interpretation: generateRuneInterpretation(rune, reversed, position, question)
      };
    });

    const generalOutlook = {
      type: 'norns_spread' as const,
      past: {
        rune: nornsInterpretations[0].rune,
        reversed: nornsInterpretations[0].reversed,
        interpretation: nornsInterpretations[0].interpretation
      },
      present: {
        rune: nornsInterpretations[1].rune,
        reversed: nornsInterpretations[1].reversed,
        interpretation: nornsInterpretations[1].interpretation
      },
      future: {
        rune: nornsInterpretations[2].rune,
        reversed: nornsInterpretations[2].reversed,
        interpretation: nornsInterpretations[2].interpretation
      },
      overallGuidance: `The Norns reveal your path through time: ${nornsInterpretations[0].rune.name} (past) has shaped your foundation, ${nornsInterpretations[1].rune.name} (present) guides your current choices, and ${nornsInterpretations[2].rune.name} (future) shows the potential outcome. The Web of Wyrd weaves these energies together for your highest good.`
    };

    // 2. Current Path - Single Tarot Card
    const { card: tarotCard, reversed: tarotReversed } = drawSingleTarotCard();
    const currentPath = {
      type: 'tarot_card' as const,
      card: tarotCard,
      reversed: tarotReversed,
      interpretation: generateTarotPathInterpretation(tarotCard, tarotReversed, 'current_path'),
      guidance: `The ${tarotCard.name} illuminates your current path. ${tarotReversed ? 'Its reversed position suggests internal work or challenges to overcome.' : 'Its upright position encourages you to fully embrace this energy.'} Focus on the themes of ${tarotCard.keywords.slice(0, 3).join(', ')} as you navigate your present circumstances.`
    };

    // 3. Path of Resolution - I-Ching Hexagram with Ifá correspondence
    const hexagramReading = await getResolutionReading(question);
    const ifaReading = await getIfaReading(question);

    if (!hexagramReading || !ifaReading) {
      return res.status(500).json({ error: 'Failed to generate complete reading' });
    }

    const pathOfResolution = {
      type: 'hexagram_with_ifa' as const,
      hexagram: {
        number: hexagramReading.number,
        name: hexagramReading.details.trad_chinese || hexagramReading.details.english,
        symbol: hexagramReading.details.hex_font,
        glyph: hexagramReading.details.hex_font,
        english: hexagramReading.details.english,
        interpretation: hexagramReading.details.wilhelm_judgment?.comments || hexagramReading.details.wilhelm_symbolic || 'Ancient wisdom for contemplation.',
        trigrams: `${hexagramReading.details.wilhelm_above?.alchemical || 'UNKNOWN'} over ${hexagramReading.details.wilhelm_below?.alchemical || 'UNKNOWN'}`
      },
      ifa: {
        primary: ifaReading.ifa.primary,
        primaryGlyph: ifaReading.ifa.primaryGlyph,
        composition: parseIfaNames(ifaReading.ifa.primary)
      },
      changingLines: hexagramReading.hasChanging ? hexagramReading.changingLineDetails : null,
      transformed: hexagramReading.transformedNumber ? {
        hexagram: {
          number: hexagramReading.transformedNumber,
          name: hexagramReading.transformedDetails.trad_chinese || hexagramReading.transformedDetails.english,
          symbol: hexagramReading.transformedDetails.hex_font,
          english: hexagramReading.transformedDetails.english
        },
        ifa: {
          secondary: ifaReading.transformed?.ifa.secondary || '',
          secondaryGlyph: ifaReading.transformed?.ifa.secondaryGlyph || ''
        }
      } : null,
      guidance: `The path of resolution is revealed through Hexagram ${hexagramReading.number}: ${hexagramReading.details.english}, which corresponds to the Ifá Odu ${ifaReading.ifa.primary}. This ancient wisdom points toward ${hexagramReading.details.wilhelm_judgment?.comments ? hexagramReading.details.wilhelm_judgment.comments.substring(0, 100) + '...' : 'inner transformation and balance'}. ${hexagramReading.hasChanging ? 'The changing lines indicate that transformation is required for resolution.' : 'This is a stable configuration suggesting steady progress toward resolution.'}`
    };

    // 4. Generate Synthesis
    const synthesis = generateSynthesis(
      { past: generalOutlook.past, present: generalOutlook.present, future: generalOutlook.future },
      currentPath,
      hexagramReading
    );

    const unifiedReading: UnifiedOracleReading = {
      question,
      timestamp,
      generalOutlook,
      currentPath,
      pathOfResolution,
      synthesis
    };

    return res.status(200).json(unifiedReading);

  } catch (error) {
    console.error('Unified oracle reading error:', error);
    return res.status(500).json({ error: 'Failed to generate unified oracle reading' });
  }
}
