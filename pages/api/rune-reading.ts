import type { NextApiRequest, NextApiResponse } from 'next';
import { 
  drawSingleRune, 
  drawNornsSpread, 
  isRuneReversed, 
  generateReversals,
  type Rune 
} from '../../resources/runes/runes';

export interface SingleRuneReading {
  type: 'single';
  rune: Rune;
  reversed: boolean;
  interpretation: string;
  timestamp: string;
  question?: string;
}

export interface NornsRuneReading {
  type: 'norns';
  spread: {
    past: {
      rune: Rune;
      reversed: boolean;
      interpretation: string;
      position: 'past';
    };
    present: {
      rune: Rune;
      reversed: boolean;
      interpretation: string;
      position: 'present';
    };
    future: {
      rune: Rune;
      reversed: boolean;
      interpretation: string;
      position: 'future';
    };
  };
  overallGuidance: string;
  timestamp: string;
  question?: string;
}

export type RuneReading = SingleRuneReading | NornsRuneReading;

// Generate contextual guidance for Norns spread
function generateNornsGuidance(
  past: { rune: Rune; reversed: boolean },
  present: { rune: Rune; reversed: boolean },
  future: { rune: Rune; reversed: boolean }
): string {
  const pastTheme = past.rune.keywords[0];
  const presentTheme = present.rune.keywords[0];
  const futureTheme = future.rune.keywords[0];
  
  return `The Norns reveal a journey from ${pastTheme} through ${presentTheme} toward ${futureTheme}. Your past experiences with ${past.rune.name.toLowerCase()} have shaped your current situation involving ${present.rune.name.toLowerCase()}. The future path suggests ${future.rune.name.toLowerCase()} energy will be prominent. Consider how these three forces connect and guide your decisions moving forward.`;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<RuneReading | { error: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { question, type = 'single' } = req.body;

    if (type === 'norns') {
      // Draw three runes for Norns spread (Past, Present, Future)
      const nornsRunes = drawNornsSpread();
      const reversals = generateReversals(3);

      // Create individual rune readings
      const pastReading = {
        rune: nornsRunes.past,
        reversed: reversals[0],
        interpretation: reversals[0] 
          ? nornsRunes.past.divination.reversed 
          : nornsRunes.past.divination.upright,
        position: 'past' as const
      };

      const presentReading = {
        rune: nornsRunes.present,
        reversed: reversals[1],
        interpretation: reversals[1] 
          ? nornsRunes.present.divination.reversed 
          : nornsRunes.present.divination.upright,
        position: 'present' as const
      };

      const futureReading = {
        rune: nornsRunes.future,
        reversed: reversals[2],
        interpretation: reversals[2] 
          ? nornsRunes.future.divination.reversed 
          : nornsRunes.future.divination.upright,
        position: 'future' as const
      };

      // Generate overall guidance
      const overallGuidance = generateNornsGuidance(
        pastReading,
        presentReading,
        futureReading
      );

      const reading: NornsRuneReading = {
        type: 'norns',
        spread: {
          past: pastReading,
          present: presentReading,
          future: futureReading
        },
        overallGuidance,
        timestamp: new Date().toISOString(),
        ...(question && { question })
      };

      res.status(200).json(reading);
    } else {
      // Single rune reading (existing functionality)
      const drawnRune = drawSingleRune();
      const reversed = isRuneReversed();

      const interpretation = reversed ? drawnRune.divination.reversed : drawnRune.divination.upright;

      const reading: SingleRuneReading = {
        type: 'single',
        rune: drawnRune,
        reversed,
        interpretation,
        timestamp: new Date().toISOString(),
        ...(question && { question })
      };

      res.status(200).json(reading);
    }
  } catch (error) {
    console.error('Error in rune reading:', error);
    res.status(500).json({ error: 'Failed to generate rune reading' });
  }
}
