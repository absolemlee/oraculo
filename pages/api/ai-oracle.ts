// AI-Optimized Oracle API - Structured for LLM consumption and interpretation
import type { NextApiRequest, NextApiResponse } from 'next';
import { 
  drawRunesWithoutReplacement,
  Rune 
} from '../../resources/runes/runes';
import { 
  drawSingleTarotCard,
  TarotCard 
} from '../../resources/tarot/tarot';
import { randomBytes } from 'crypto';

// AI-friendly response interface with structured guidance
interface AIReadingResponse {
  // Unique identifier for tracking and logging
  id: string;
  version: string;
  timestamp: string;
  
  // Original query context
  query: {
    question: string;
    requestedBy?: string; // Optional AI agent identifier
    context?: string; // Optional additional context
  };
  
  // Executive summary for quick LLM parsing
  summary: {
    primaryMessage: string;
    keyThemes: string[];
    suggestedTone: 'thoughtful' | 'empowering' | 'cautious' | 'encouraging' | 'reflective';
    confidence: number; // 0-1 scale
    complexity: 'simple' | 'moderate' | 'complex';
  };
  
  // Detailed reading sections with LLM-friendly structure
  reading: {
    // Past-Present-Future temporal analysis
    temporalGuidance: {
      description: string;
      past: {
        symbol: string;
        symbolName: string;
        orientation: 'upright' | 'reversed';
        meaning: string;
        influence: string;
        keywords: string[];
        element: string;
      };
      present: {
        symbol: string;
        symbolName: string;
        orientation: 'upright' | 'reversed';
        meaning: string;
        influence: string;
        keywords: string[];
        element: string;
      };
      future: {
        symbol: string;
        symbolName: string;
        orientation: 'upright' | 'reversed';
        meaning: string;
        influence: string;
        keywords: string[];
        element: string;
      };
      narrative: string;
    };
    
    // Current situation/energy
    currentEnergy: {
      description: string;
      card: {
        name: string;
        arcana: 'major' | 'minor';
        suit?: string;
        number?: number;
        orientation: 'upright' | 'reversed';
        meaning: string;
        keywords: string[];
        element?: string;
      };
      interpretation: string;
      practicalAdvice: string;
    };
    
    // Resolution path with ancient wisdom
    resolutionPath: {
      description: string;
      hexagram: {
        number: number;
        name: string;
        chineseName: string;
        symbol: string;
        meaning: string;
        trigrams: {
          upper: string;
          lower: string;
          composition: string;
        };
      };
      ifa: {
        odu: string;
        glyph: string;
        components: {
          primary: string;
          secondary: string;
        };
      };
      isChanging: boolean;
      changingGuidance?: {
        description: string;
        lines: Array<{
          position: number;
          text: string;
          meaning: string;
        }>;
        transformsTo?: {
          number: number;
          name: string;
          symbol: string;
          meaning: string;
        };
      };
      wisdomText: string;
    };
  };
  
  // Synthesized guidance optimized for LLM interpretation
  guidance: {
    // High-level synthesis
    overallMessage: string;
    
    // Actionable steps formatted for easy extraction
    actionableInsights: Array<{
      priority: 'high' | 'medium' | 'low';
      category: 'immediate' | 'short-term' | 'long-term';
      action: string;
      rationale: string;
    }>;
    
    // Timing and pacing guidance
    timing: {
      urgency: 'immediate' | 'soon' | 'gradual' | 'patient';
      description: string;
      phaseOfChange: 'beginning' | 'middle' | 'completion' | 'stable';
    };
    
    // Potential challenges and opportunities
    considerations: {
      strengths: string[];
      challenges: string[];
      opportunities: string[];
    };
    
    // Contextual framing for different use cases
    applicationContext: {
      personal: string;
      professional: string;
      spiritual: string;
      relational: string;
    };
  };
  
  // Metadata for AI processing
  metadata: {
    readingType: 'unified-oracle';
    systemsUsed: string[];
    processingTimeMs: number;
    symbolsCount: {
      runes: number;
      tarot: number;
      hexagrams: number;
    };
  };
  
  // Prompt helpers for LLM consumption
  promptHelpers: {
    // Ready-to-use context for LLM prompts
    contextSummary: string;
    // Suggested response framing
    responseFraming: string;
    // Key phrases to emphasize
    emphasisPoints: string[];
  };
}

// Helper functions
function generateReadingId(): string {
  return `ai-reading-${Date.now()}-${randomBytes(4).toString('hex')}`;
}

function calculateConfidence(reading: any): number {
  // Higher confidence when there's alignment across systems
  let score = 0.7; // Base confidence
  
  // Increase if there's thematic alignment
  const allKeywords = [
    ...reading.runes.flatMap((r: any) => r.keywords),
    ...reading.tarot.keywords
  ];
  const uniqueKeywords = new Set(allKeywords);
  if (allKeywords.length - uniqueKeywords.size > 3) {
    score += 0.1; // Keyword overlap increases confidence
  }
  
  // Increase if hexagram is stable (no changing lines)
  if (!reading.hexagram.hasChanging) {
    score += 0.1;
  }
  
  return Math.min(score, 0.95); // Cap at 95%
}

function determineTone(reading: any): AIReadingResponse['summary']['suggestedTone'] {
  const keywords = reading.allKeywords || [];
  
  if (keywords.some((k: string) => ['warning', 'caution', 'danger', 'conflict'].includes(k.toLowerCase()))) {
    return 'cautious';
  }
  if (keywords.some((k: string) => ['power', 'strength', 'victory', 'success'].includes(k.toLowerCase()))) {
    return 'empowering';
  }
  if (keywords.some((k: string) => ['hope', 'growth', 'opportunity', 'beginning'].includes(k.toLowerCase()))) {
    return 'encouraging';
  }
  if (keywords.some((k: string) => ['wisdom', 'meditation', 'contemplation', 'inner'].includes(k.toLowerCase()))) {
    return 'reflective';
  }
  
  return 'thoughtful';
}

function assessComplexity(reading: any): 'simple' | 'moderate' | 'complex' {
  let complexityScore = 0;
  
  if (reading.hexagram.hasChanging) complexityScore += 2;
  if (reading.runes.some((r: any) => r.reversed)) complexityScore += 1;
  if (reading.tarot.reversed) complexityScore += 1;
  if (reading.hexagram.changingLines?.length > 2) complexityScore += 1;
  
  if (complexityScore <= 1) return 'simple';
  if (complexityScore <= 3) return 'moderate';
  return 'complex';
}

// Generate rune interpretation
function generateRuneInterpretation(rune: Rune, reversed: boolean, position: string): string {
  const meaning = reversed ? rune.divination.reversed : rune.divination.upright;
  return meaning;
}

// Generate influence description
function generateInfluence(rune: Rune, reversed: boolean, position: string): string {
  const positionInfluence = {
    'past': `The ${rune.name} rune in your past indicates foundational energies of ${rune.keywords[0]?.toLowerCase()} that have shaped your journey`,
    'present': `Currently, ${rune.name} influences your situation through ${rune.keywords[0]?.toLowerCase()}, affecting your immediate choices`,
    'future': `Looking ahead, ${rune.name} suggests potential outcomes involving ${rune.keywords[0]?.toLowerCase()} if current patterns continue`
  };
  
  return positionInfluence[position as keyof typeof positionInfluence] || '';
}

// Helper to fetch I-Ching reading
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

// Helper to fetch Ifá correspondence
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

// Parse Ifá components
function parseIfaComponents(oduName: string) {
  const parts = oduName.split(' + ');
  return {
    primary: parts[0]?.trim() || oduName,
    secondary: parts[1]?.trim() || parts[0]?.trim() || oduName
  };
}

// Generate actionable insights
function generateActionableInsights(
  runes: any[],
  tarot: any,
  hexagram: any
): AIReadingResponse['guidance']['actionableInsights'] {
  const insights: AIReadingResponse['guidance']['actionableInsights'] = [];
  
  // From present rune
  insights.push({
    priority: 'high',
    category: 'immediate',
    action: `Focus on cultivating ${runes[1].keywords[0]?.toLowerCase()} in your current situation`,
    rationale: `The ${runes[1].name} rune in your present position emphasizes this energy as immediately relevant`
  });
  
  // From tarot
  insights.push({
    priority: 'high',
    category: 'short-term',
    action: `Engage with the themes of ${tarot.keywords.slice(0, 2).join(' and ')}`,
    rationale: `The ${tarot.name} card illuminates your current path and suggests these areas need attention`
  });
  
  // From hexagram
  insights.push({
    priority: 'medium',
    category: 'long-term',
    action: `Contemplate the wisdom of ${hexagram.details.english}`,
    rationale: 'The I-Ching hexagram provides strategic direction for sustained growth'
  });
  
  // From future rune
  insights.push({
    priority: 'medium',
    category: 'long-term',
    action: `Prepare for outcomes related to ${runes[2].keywords[0]?.toLowerCase()}`,
    rationale: `The ${runes[2].name} rune in your future position suggests this energy will become prominent`
  });
  
  return insights;
}

// Generate application contexts
function generateApplicationContexts(
  question: string,
  runes: any[],
  tarot: any,
  hexagram: any
): AIReadingResponse['guidance']['applicationContext'] {
  return {
    personal: `In your personal development, this reading emphasizes ${runes[1].keywords[0]?.toLowerCase()} and ${tarot.keywords[0]?.toLowerCase()}. Reflect on how ${hexagram.details.english.toLowerCase()} applies to your inner growth.`,
    
    professional: `For career and professional matters, consider how ${tarot.name} energy can be channeled into your work. The wisdom of ${hexagram.details.english} suggests ${hexagram.hasChanging ? 'adaptability and change' : 'maintaining steady progress'}.`,
    
    spiritual: `Spiritually, this reading invites contemplation of ${runes[1].name} energy and the deeper meanings of ${hexagram.details.english}. Your journey involves integrating ${runes[0].name} (past) with ${runes[2].name} (future potential).`,
    
    relational: `In relationships and connections, the ${tarot.name} card suggests approaching interactions with ${tarot.keywords[0]?.toLowerCase()}. The overall pattern indicates ${hexagram.hasChanging ? 'evolving dynamics' : 'stable foundations'}.`
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AIReadingResponse | { error: string }>
) {
  const startTime = Date.now();
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { question, requestedBy, context } = req.body;

    if (!question || typeof question !== 'string') {
      return res.status(400).json({ error: 'Question is required and must be a string' });
    }

    const timestamp = new Date().toISOString();
    const readingId = generateReadingId();

    // 1. Draw Runes for temporal analysis
    const nornsRunes = drawRunesWithoutReplacement(3);
    const runeReadings = nornsRunes.map((rune, index) => {
      const positions = ['past', 'present', 'future'];
      const position = positions[index];
      const reversed = Math.random() < 0.5;
      return {
        position,
        rune,
        reversed,
        keywords: rune.keywords,
        element: rune.element || 'Spirit'
      };
    });

    // 2. Draw Tarot for current energy
    const { card: tarotCard, reversed: tarotReversed } = drawSingleTarotCard();

    // 3. Get Hexagram and Ifá for resolution
    const hexagramReading = await getResolutionReading(question);
    const ifaReading = await getIfaReading(question);

    if (!hexagramReading || !ifaReading) {
      return res.status(500).json({ error: 'Failed to generate complete reading' });
    }

    // Collect all keywords for analysis
    const allKeywords = [
      ...runeReadings.flatMap(r => r.keywords),
      ...tarotCard.keywords
    ];

    const rawReading = {
      runes: runeReadings,
      tarot: { ...tarotCard, reversed: tarotReversed, keywords: tarotCard.keywords },
      hexagram: hexagramReading,
      allKeywords
    };

    // Calculate metadata
    const confidence = calculateConfidence(rawReading);
    const suggestedTone = determineTone(rawReading);
    const complexity = assessComplexity(rawReading);

    // Extract key themes
    const keyThemes = [...new Set([
      runeReadings[1].keywords[0], // Present rune primary keyword
      tarotCard.keywords[0], // Tarot primary keyword
      tarotCard.keywords[1], // Tarot secondary keyword
      runeReadings[1].element, // Present element
      hexagramReading.hasChanging ? 'transformation' : 'stability'
    ])].filter(Boolean).slice(0, 5);

    // Build temporal narrative
    const temporalNarrative = `Your journey begins with ${runeReadings[0].rune.name}, representing ${runeReadings[0].keywords[0]?.toLowerCase()} in your past. This foundation has led to your present situation, characterized by ${runeReadings[1].rune.name} and themes of ${runeReadings[1].keywords[0]?.toLowerCase()}. Looking ahead, ${runeReadings[2].rune.name} suggests potential outcomes involving ${runeReadings[2].keywords[0]?.toLowerCase()}. This temporal pattern reveals a natural progression from ${runeReadings[0].element} energy through ${runeReadings[1].element} toward ${runeReadings[2].element}.`;

    // Build primary message
    const primaryMessage = `The oracle reveals a reading centered on ${keyThemes.slice(0, 2).join(' and ')}. ${tarotCard.name} illuminates your current path, while Hexagram ${hexagramReading.number} (${hexagramReading.details.english}) provides ancient wisdom for resolution. ${hexagramReading.hasChanging ? 'Changing lines indicate transformation is required.' : 'The stable hexagram suggests maintaining your current course.'}`;

    // Generate actionable insights
    const actionableInsights = generateActionableInsights(
      runeReadings.map(r => r.rune),
      tarotCard,
      hexagramReading
    );

    // Determine timing
    const urgency = hexagramReading.hasChanging ? 'soon' : 'gradual';
    const phaseOfChange = hexagramReading.hasChanging ? 'middle' : 'stable';
    const timingDescription = hexagramReading.hasChanging 
      ? 'Change is active and requires timely attention. The changing lines suggest transformation is already in motion.'
      : 'This is a period for patient, steady progress. No urgent action is required; focus on consistency.';

    // Build application contexts
    const applicationContext = generateApplicationContexts(
      question,
      runeReadings.map(r => r.rune),
      tarotCard,
      hexagramReading
    );

    // Build changing guidance if applicable
    let changingGuidance = undefined;
    if (hexagramReading.hasChanging && hexagramReading.changingLineDetails) {
      changingGuidance = {
        description: 'Specific lines are changing, indicating areas requiring attention and transformation',
        lines: hexagramReading.changingLineDetails.map((line: any) => ({
          position: line.line,
          text: line.text,
          meaning: line.comments || 'Contemplate the significance of this changing line'
        })),
        transformsTo: hexagramReading.transformedNumber ? {
          number: hexagramReading.transformedNumber,
          name: hexagramReading.transformedDetails.english,
          symbol: hexagramReading.transformedDetails.hex_font,
          meaning: hexagramReading.transformedDetails.wilhelm_judgment?.comments || 'The hexagram this reading transforms into'
        } : undefined
      };
    }

    // Build the AI-optimized response
    const response: AIReadingResponse = {
      id: readingId,
      version: '1.0.0',
      timestamp,
      
      query: {
        question,
        ...(requestedBy && { requestedBy }),
        ...(context && { context })
      },
      
      summary: {
        primaryMessage,
        keyThemes,
        suggestedTone,
        confidence,
        complexity
      },
      
      reading: {
        temporalGuidance: {
          description: 'Three runes reveal your path through time using the Norns spread (Past, Present, Future)',
          past: {
            symbol: runeReadings[0].rune.symbol,
            symbolName: runeReadings[0].rune.name,
            orientation: runeReadings[0].reversed ? 'reversed' : 'upright',
            meaning: generateRuneInterpretation(runeReadings[0].rune, runeReadings[0].reversed, 'past'),
            influence: generateInfluence(runeReadings[0].rune, runeReadings[0].reversed, 'past'),
            keywords: runeReadings[0].rune.keywords,
            element: runeReadings[0].element
          },
          present: {
            symbol: runeReadings[1].rune.symbol,
            symbolName: runeReadings[1].rune.name,
            orientation: runeReadings[1].reversed ? 'reversed' : 'upright',
            meaning: generateRuneInterpretation(runeReadings[1].rune, runeReadings[1].reversed, 'present'),
            influence: generateInfluence(runeReadings[1].rune, runeReadings[1].reversed, 'present'),
            keywords: runeReadings[1].rune.keywords,
            element: runeReadings[1].element
          },
          future: {
            symbol: runeReadings[2].rune.symbol,
            symbolName: runeReadings[2].rune.name,
            orientation: runeReadings[2].reversed ? 'reversed' : 'upright',
            meaning: generateRuneInterpretation(runeReadings[2].rune, runeReadings[2].reversed, 'future'),
            influence: generateInfluence(runeReadings[2].rune, runeReadings[2].reversed, 'future'),
            keywords: runeReadings[2].rune.keywords,
            element: runeReadings[2].element
          },
          narrative: temporalNarrative
        },
        
        currentEnergy: {
          description: 'A single Tarot card reveals the energy and themes of your current path',
          card: {
            name: tarotCard.name,
            arcana: tarotCard.arcana,
            suit: tarotCard.suit,
            number: typeof tarotCard.number === 'number' ? tarotCard.number : undefined,
            orientation: tarotReversed ? 'reversed' : 'upright',
            meaning: tarotReversed ? tarotCard.divination.reversed : tarotCard.divination.upright,
            keywords: tarotCard.keywords,
            element: tarotCard.element
          },
          interpretation: `${tarotCard.name}${tarotReversed ? ' (Reversed)' : ''} appears in your reading, bringing ${tarotCard.arcana === 'major' ? 'significant life lessons and major themes' : `the ${tarotCard.element} energy of the ${tarotCard.suit} suit`}. ${tarotReversed ? tarotCard.divination.reversed : tarotCard.divination.upright}`,
          practicalAdvice: `Focus on integrating ${tarotCard.keywords.slice(0, 3).join(', ')} into your current situation. ${tarotReversed ? 'The reversed position suggests internal work or the need to address blocks and challenges.' : 'The upright position encourages you to fully embrace and express this energy.'}`
        },
        
        resolutionPath: {
          description: 'The I-Ching hexagram with Ifá correspondence reveals the path toward resolution',
          hexagram: {
            number: hexagramReading.number,
            name: hexagramReading.details.english,
            chineseName: hexagramReading.details.trad_chinese || hexagramReading.details.pinyin,
            symbol: hexagramReading.details.hex_font,
            meaning: hexagramReading.details.wilhelm_judgment?.comments || hexagramReading.details.wilhelm_symbolic || 'Wisdom from the ancient oracle',
            trigrams: {
              upper: hexagramReading.details.wilhelm_above?.alchemical || 'Unknown',
              lower: hexagramReading.details.wilhelm_below?.alchemical || 'Unknown',
              composition: `${hexagramReading.details.wilhelm_above?.english || 'Heaven'} above ${hexagramReading.details.wilhelm_below?.english || 'Earth'}`
            }
          },
          ifa: {
            odu: ifaReading.ifa.primary,
            glyph: ifaReading.ifa.primaryGlyph,
            components: parseIfaComponents(ifaReading.ifa.primary)
          },
          isChanging: hexagramReading.hasChanging,
          changingGuidance,
          wisdomText: `Hexagram ${hexagramReading.number}: ${hexagramReading.details.english} corresponds to the Ifá Odu ${ifaReading.ifa.primary}. ${hexagramReading.details.wilhelm_judgment?.text || 'Ancient wisdom guides the way forward.'}`
        }
      },
      
      guidance: {
        overallMessage: primaryMessage + ' ' + temporalNarrative,
        
        actionableInsights,
        
        timing: {
          urgency,
          description: timingDescription,
          phaseOfChange
        },
        
        considerations: {
          strengths: [
            `Strong foundation from ${runeReadings[0].rune.name} energy in your past`,
            `Current alignment with ${tarotCard.name} themes`,
            `Ancient wisdom of ${hexagramReading.details.english} provides guidance`
          ],
          challenges: [
            tarotReversed ? `Reversed ${tarotCard.name} suggests internal blocks to address` : `Maintaining balance with ${tarotCard.name} energy`,
            hexagramReading.hasChanging ? 'Navigating transformation indicated by changing lines' : 'Exercising patience during stable period',
            `Integrating ${runeReadings[1].element} energy in present circumstances`
          ],
          opportunities: [
            `Leveraging ${runeReadings[2].rune.name} potential in the future`,
            `Applying ${tarotCard.keywords[0]} to current challenges`,
            hexagramReading.hasChanging ? 'Using transformation as catalyst for growth' : 'Building sustainable foundations'
          ]
        },
        
        applicationContext
      },
      
      metadata: {
        readingType: 'unified-oracle',
        systemsUsed: ['Elder Futhark Runes', 'Tarot', 'I-Ching', 'Ifá'],
        processingTimeMs: Date.now() - startTime,
        symbolsCount: {
          runes: 3,
          tarot: 1,
          hexagrams: hexagramReading.hasChanging ? 2 : 1
        }
      },
      
      promptHelpers: {
        contextSummary: `This oracle reading combines Runes (${runeReadings.map(r => r.rune.name).join(', ')}), Tarot (${tarotCard.name}), and I-Ching (Hexagram ${hexagramReading.number}: ${hexagramReading.details.english}) to address: "${question}". Primary themes include ${keyThemes.slice(0, 3).join(', ')}.`,
        
        responseFraming: `When responding to the user, adopt a ${suggestedTone} tone. This is a ${complexity} reading with ${confidence >= 0.8 ? 'high' : confidence >= 0.6 ? 'moderate' : 'developing'} thematic coherence. Emphasize the connection between past influences, present energy, and future potential.`,
        
        emphasisPoints: [
          `The ${runeReadings[1].rune.name} rune in the present position`,
          `The ${tarotCard.name} card's ${tarotReversed ? 'reversed' : 'upright'} orientation`,
          `Hexagram ${hexagramReading.number}: ${hexagramReading.details.english}`,
          hexagramReading.hasChanging ? 'The significance of changing lines' : 'The stability of the hexagram',
          `Key themes: ${keyThemes.slice(0, 2).join(' and ')}`
        ]
      }
    };

    return res.status(200).json(response);

  } catch (error) {
    console.error('AI Oracle reading error:', error);
    return res.status(500).json({ error: 'Failed to generate AI-optimized reading' });
  }
}
