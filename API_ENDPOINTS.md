# Oráculo API Endpoints Documentation

Complete reference for all available API endpoints in the Oráculo divination system.

---

## Table of Contents

- [Overview](#overview)
- [Traditional I-Ching Reading](#traditional-i-ching-reading)
- [Ifá Correspondence Reading](#ifá-correspondence-reading)
- [Rune Reading](#rune-reading)
- [Tarot Reading](#tarot-reading)
- [Unified Oracle Reading](#unified-oracle-reading)
- [AI-Optimized Oracle Reading](#ai-optimized-oracle-reading)
- [Hexagram Lookup](#hexagram-lookup)
- [Health Check](#health-check)

---

## Overview

All API endpoints support CORS and return JSON responses. Most endpoints accept both GET and POST requests unless otherwise specified.

**Base URL:** `http://localhost:4545` (development) or your production domain

**Common Response Fields:**
- `timestamp`: ISO 8601 formatted date-time string
- `question`: Optional user-provided question (when applicable)

---

## Traditional I-Ching Reading

Generate a traditional I-Ching hexagram reading using the three-coin method.

### Endpoint
```
GET/POST /api/reading
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `question` | string | No | The question or topic for the reading |

### Request Example

```bash
# GET request
curl "http://localhost:4545/api/reading?question=What%20should%20I%20focus%20on?"

# POST request
curl -X POST http://localhost:4545/api/reading \
  -H "Content-Type: application/json" \
  -d '{"question": "What should I focus on?"}'
```

### Response Schema

```typescript
{
  question: string;
  number: number;              // Hexagram number (1-64)
  details: {
    hex_font: string;          // Unicode hexagram symbol
    english: string;           // English name
    trad_chinese: string;      // Traditional Chinese name
    binary: number;            // Binary representation
    wilhelm_judgment: {
      text: string;
      comments: string;
    };
    wilhelm_image: {
      text: string;
      comments: string;
    };
    wilhelm_lines: {
      [key: string]: {         // Line numbers 1-6
        text: string;
        comments: string;
      };
    };
    // ... additional fields
  };
  hasChanging: boolean;        // Whether there are changing lines
  transformedNumber: number | null;  // Target hexagram (if changing)
  transformedDetails: object | null; // Target hexagram details
  changingLineDetails: Array<{
    line: number;              // Line position (1-6)
    text: string;
    comments: string;
  }>;
}
```

### Response Example

```json
{
  "question": "What should I focus on?",
  "number": 27,
  "details": {
    "hex_font": "䷚",
    "english": "Nourishment",
    "trad_chinese": "頤",
    "binary": 100001
  },
  "hasChanging": true,
  "transformedNumber": 23,
  "transformedDetails": { ... },
  "changingLineDetails": [
    {
      "line": 3,
      "text": "Nine in the third place...",
      "comments": "..."
    }
  ]
}
```

---

## Ifá Correspondence Reading

Generate an I-Ching reading with Yoruba Ifá correspondences mapped from the hexagram.

### Endpoint
```
GET/POST /api/ifa-reading
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `question` | string | No | The question or topic for the reading |

### Request Example

```bash
curl -X POST http://localhost:4545/api/ifa-reading \
  -H "Content-Type: application/json" \
  -d '{"question": "Seeking guidance on my path"}'
```

### Response Schema

```typescript
{
  question: string;
  hexagram: {
    number: number;            // Hexagram number (1-64)
    symbol: string;            // Unicode hexagram symbol
    english: string;           // English name
  };
  ifa: {
    primary: string;           // Primary Odu name (e.g., "Ogbe + Otura")
    primaryGlyph: string;      // Ifá glyph representation
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
      secondary: string;       // Secondary Odu name
      secondaryGlyph: string;
    };
  } | null;
}
```

### Response Example

```json
{
  "question": "Seeking guidance on my path",
  "hexagram": {
    "number": 1,
    "symbol": "䷀",
    "english": "The Creative"
  },
  "ifa": {
    "primary": "Ogbe + Otura",
    "primaryGlyph": "𝍠"
  },
  "changingLines": null,
  "transformed": null
}
```

---

## Rune Reading

Draw Elder Futhark runes for divination. Supports single rune or Norns spread (Past, Present, Future).

### Endpoint
```
POST /api/rune-reading
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `question` | string | No | The question or topic for the reading |
| `type` | string | No | Reading type: `"single"` or `"norns"` (default: `"single"`) |

### Request Example

```bash
# Single rune reading
curl -X POST http://localhost:4545/api/rune-reading \
  -H "Content-Type: application/json" \
  -d '{"question": "What energy should I work with?", "type": "single"}'

# Norns spread (Past, Present, Future)
curl -X POST http://localhost:4545/api/rune-reading \
  -H "Content-Type: application/json" \
  -d '{"question": "Show me my path", "type": "norns"}'
```

### Response Schema - Single Rune

```typescript
{
  type: "single";
  rune: {
    name: string;              // Rune name (e.g., "Fehu")
    letter: string;            // Transliteration (e.g., "F")
    unicode: string;           // Unicode character
    meaning: string;           // Core meaning
    keywords: string[];        // Associated keywords
    element: string;           // Associated element
    divination: {
      upright: string;         // Upright interpretation
      reversed: string;        // Reversed interpretation
    };
  };
  reversed: boolean;           // Whether rune is reversed
  interpretation: string;      // Full interpretation
  timestamp: string;           // ISO 8601 timestamp
  question?: string;           // Optional question
}
```

### Response Schema - Norns Spread

```typescript
{
  type: "norns";
  spread: {
    past: {
      rune: RuneObject;
      reversed: boolean;
      interpretation: string;
      position: "past";
    };
    present: {
      rune: RuneObject;
      reversed: boolean;
      interpretation: string;
      position: "present";
    };
    future: {
      rune: RuneObject;
      reversed: boolean;
      interpretation: string;
      position: "future";
    };
  };
  overallGuidance: string;     // Synthesis of all three runes
  timestamp: string;
  question?: string;
}
```

### Response Example - Norns Spread

```json
{
  "type": "norns",
  "spread": {
    "past": {
      "rune": {
        "name": "Uruz",
        "letter": "U",
        "unicode": "ᚢ",
        "meaning": "Aurochs, Wild Ox",
        "element": "Earth"
      },
      "reversed": false,
      "interpretation": "Strength and vitality from the past...",
      "position": "past"
    },
    "present": { ... },
    "future": { ... }
  },
  "overallGuidance": "The Norns reveal a journey from strength through...",
  "timestamp": "2025-11-25T10:30:00.000Z"
}
```

---

## Tarot Reading

Draw Tarot cards from the complete 78-card deck. Supports single card, named spreads, or custom multi-card readings.

### Endpoint
```
POST /api/tarot-reading
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `readingType` | string | Yes | Type of reading: `"single"`, `"spread"`, or `"custom"` |
| `spreadName` | string | Conditional | Required if `readingType` is `"spread"`. Options: `"three-card"`, `"celtic-cross"`, `"relationship"`, `"decision"`, `"career"` |
| `cardCount` | number | Conditional | Required if `readingType` is `"custom"`. Number of cards to draw (1-10) |

### Request Examples

```bash
# Single card
curl -X POST http://localhost:4545/api/tarot-reading \
  -H "Content-Type: application/json" \
  -d '{"readingType": "single"}'

# Named spread
curl -X POST http://localhost:4545/api/tarot-reading \
  -H "Content-Type: application/json" \
  -d '{"readingType": "spread", "spreadName": "three-card"}'

# Custom number of cards
curl -X POST http://localhost:4545/api/tarot-reading \
  -H "Content-Type: application/json" \
  -d '{"readingType": "custom", "cardCount": 5}'
```

### Response Schema - Single Card

```typescript
{
  type: "single";
  card: {
    name: string;              // Card name (e.g., "The Fool")
    number: number;            // Card number in deck
    arcana: "major" | "minor"; // Arcana type
    suit?: string;             // Suit (for Minor Arcana)
    element?: string;          // Associated element
    keywords: string[];        // Key concepts
    divination: {
      upright: string;
      reversed: string;
    };
  };
  reversed: boolean;
  interpretation: string;
  guidance: string;
  timestamp: string;
}
```

### Response Schema - Spread

```typescript
{
  type: "spread";
  spreadName: string;
  spread: {
    name: string;
    description: string;
    positions: string[];       // Position names
  };
  cards: Array<{
    position: string;          // Position name (e.g., "Past")
    card: TarotCardObject;
    reversed: boolean;
    interpretation: string;
  }>;
  overallGuidance: string;
  timestamp: string;
}
```

### Response Schema - Custom

```typescript
{
  type: "custom";
  cardCount: number;
  cards: Array<{
    card: TarotCardObject;
    reversed: boolean;
    interpretation: string;
  }>;
  overallGuidance: string;
  timestamp: string;
}
```

### Available Spreads

| Spread Name | Positions | Description |
|------------|-----------|-------------|
| `three-card` | Past, Present, Future | Classic three-card temporal spread |
| `celtic-cross` | 10 positions | Comprehensive life situation analysis |
| `relationship` | Self, Partner, Connection, Challenge, Outcome | Relationship dynamics |
| `decision` | Situation, Option A, Option B, Advice, Outcome | Decision-making guidance |
| `career` | Current Position, Challenges, Opportunities, Advice, Outcome | Career path insight |

---

## Unified Oracle Reading

Comprehensive reading combining all three divination systems: Runes (Norns spread), Tarot (single card), and I-Ching/Ifá (hexagram).

### Endpoint
```
POST /api/unified-oracle
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `question` | string | Yes | The question or topic for the comprehensive reading |

### Request Example

```bash
curl -X POST http://localhost:4545/api/unified-oracle \
  -H "Content-Type: application/json" \
  -d '{"question": "What do I need to know about my current path?"}'
```

### Response Schema

```typescript
{
  question: string;
  timestamp: string;
  generalOutlook: {
    type: "norns_spread";
    past: {
      rune: RuneObject;
      reversed: boolean;
      interpretation: string;
    };
    present: {
      rune: RuneObject;
      reversed: boolean;
      interpretation: string;
    };
    future: {
      rune: RuneObject;
      reversed: boolean;
      interpretation: string;
    };
    overallGuidance: string;
  };
  currentPath: {
    type: "tarot_card";
    card: TarotCardObject;
    reversed: boolean;
    interpretation: string;
    guidance: string;
  };
  pathOfResolution: {
    type: "hexagram_with_ifa";
    hexagram: {
      number: number;
      name: string;
      symbol: string;
      glyph: string;
      english: string;
      interpretation: string;
      trigrams: string;
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
    transformed: {
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
    keyThemes: string[];       // 5 main themes across all systems
    overallMessage: string;    // Integrated interpretation
    actionSteps: string[];     // Practical guidance
    timing: string;            // Temporal guidance
  };
}
```

### Response Example (Simplified)

```json
{
  "question": "What do I need to know about my current path?",
  "timestamp": "2025-11-25T10:30:00.000Z",
  "generalOutlook": {
    "type": "norns_spread",
    "past": { "rune": {...}, "reversed": false, "interpretation": "..." },
    "present": { "rune": {...}, "reversed": true, "interpretation": "..." },
    "future": { "rune": {...}, "reversed": false, "interpretation": "..." },
    "overallGuidance": "The Norns reveal your path through time..."
  },
  "currentPath": {
    "type": "tarot_card",
    "card": { "name": "The Magician", ... },
    "reversed": false,
    "interpretation": "...",
    "guidance": "..."
  },
  "pathOfResolution": {
    "type": "hexagram_with_ifa",
    "hexagram": { "number": 1, "english": "The Creative", ... },
    "ifa": { "primary": "Ogbe + Otura", ... },
    "changingLines": null,
    "transformed": null,
    "guidance": "..."
  },
  "synthesis": {
    "keyThemes": ["Fire", "Air", "transformation", "wisdom", "balance"],
    "overallMessage": "The cosmic currents reveal a powerful alignment...",
    "actionSteps": [...],
    "timing": "This is a time for patience and steady progress"
  }
}
```

---

## AI-Optimized Oracle Reading

**[NEW]** Comprehensive reading specifically structured for AI/LLM agents to consume and use as the foundation for constructing responses. This endpoint provides the same divination power as the Unified Oracle but with enhanced structure, metadata, and prompt helpers optimized for AI interpretation.

### Endpoint
```
POST /api/ai-oracle
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `question` | string | Yes | The question or topic for the comprehensive reading |
| `requestedBy` | string | No | Identifier for the AI agent making the request (for logging/tracking) |
| `context` | string | No | Additional context about the situation or user |

### Request Example

```bash
curl -X POST http://localhost:4545/api/ai-oracle \
  -H "Content-Type: application/json" \
  -d '{
    "question": "What guidance do I need for my current situation?",
    "requestedBy": "claude-assistant",
    "context": "User is seeking career guidance"
  }'
```

### Response Schema

The AI-optimized response includes extensive metadata and structured guidance designed for LLM consumption:

```typescript
{
  // Tracking and versioning
  id: string;                    // Unique reading identifier
  version: string;               // API version
  timestamp: string;             // ISO 8601 timestamp
  
  // Original query
  query: {
    question: string;
    requestedBy?: string;
    context?: string;
  };
  
  // Executive summary for quick parsing
  summary: {
    primaryMessage: string;      // High-level synthesis
    keyThemes: string[];         // 5 main themes
    suggestedTone: string;       // "thoughtful" | "empowering" | "cautious" | "encouraging" | "reflective"
    confidence: number;          // 0-1 scale
    complexity: string;          // "simple" | "moderate" | "complex"
  };
  
  // Detailed reading sections
  reading: {
    // Past-Present-Future temporal analysis (Runes)
    temporalGuidance: {
      description: string;
      past: {
        symbol: string;          // Unicode rune
        symbolName: string;
        orientation: string;     // "upright" | "reversed"
        meaning: string;
        influence: string;
        keywords: string[];
        element: string;
      };
      present: { /* same structure */ };
      future: { /* same structure */ };
      narrative: string;         // Temporal story
    };
    
    // Current situation (Tarot)
    currentEnergy: {
      description: string;
      card: {
        name: string;
        arcana: string;          // "major" | "minor"
        suit?: string;
        number?: number;
        orientation: string;
        meaning: string;
        keywords: string[];
        element?: string;
      };
      interpretation: string;
      practicalAdvice: string;
    };
    
    // Resolution path (I-Ching + Ifá)
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
  
  // Synthesized guidance optimized for AI interpretation
  guidance: {
    overallMessage: string;
    
    // Prioritized, categorized actions
    actionableInsights: Array<{
      priority: string;          // "high" | "medium" | "low"
      category: string;          // "immediate" | "short-term" | "long-term"
      action: string;
      rationale: string;
    }>;
    
    // Timing guidance
    timing: {
      urgency: string;           // "immediate" | "soon" | "gradual" | "patient"
      description: string;
      phaseOfChange: string;     // "beginning" | "middle" | "completion" | "stable"
    };
    
    // SWOT-like analysis
    considerations: {
      strengths: string[];
      challenges: string[];
      opportunities: string[];
    };
    
    // Context-specific applications
    applicationContext: {
      personal: string;
      professional: string;
      spiritual: string;
      relational: string;
    };
  };
  
  // Processing metadata
  metadata: {
    readingType: string;         // "unified-oracle"
    systemsUsed: string[];       // List of divination systems
    processingTimeMs: number;
    symbolsCount: {
      runes: number;
      tarot: number;
      hexagrams: number;
    };
  };
  
  // Ready-to-use prompt helpers
  promptHelpers: {
    contextSummary: string;      // One-paragraph context
    responseFraming: string;     // How to present the reading
    emphasisPoints: string[];    // Key points to highlight
  };
}
```

### Response Example (Simplified)

```json
{
  "id": "ai-reading-1732607400000-a3f2c9d1",
  "version": "1.0.0",
  "timestamp": "2025-11-26T10:30:00.000Z",
  
  "query": {
    "question": "What guidance do I need for my current situation?",
    "requestedBy": "claude-assistant"
  },
  
  "summary": {
    "primaryMessage": "The oracle reveals a reading centered on strength and creativity. The Magician illuminates your current path, while Hexagram 1 (The Creative) provides ancient wisdom for resolution. The stable hexagram suggests maintaining your current course.",
    "keyThemes": ["Strength", "Creativity", "Power", "Fire", "stability"],
    "suggestedTone": "empowering",
    "confidence": 0.85,
    "complexity": "moderate"
  },
  
  "reading": {
    "temporalGuidance": {
      "description": "Three runes reveal your path through time using the Norns spread",
      "past": {
        "symbol": "ᚢ",
        "symbolName": "Uruz",
        "orientation": "upright",
        "meaning": "Strength, vitality, and primal power from the wild ox",
        "influence": "The Uruz rune in your past indicates foundational energies of strength",
        "keywords": ["Strength", "Vitality", "Health", "Courage"],
        "element": "Earth"
      },
      "present": { /* ... */ },
      "future": { /* ... */ },
      "narrative": "Your journey begins with Uruz, representing strength in your past..."
    },
    
    "currentEnergy": {
      "description": "A single Tarot card reveals the energy and themes of your current path",
      "card": {
        "name": "The Magician",
        "arcana": "major",
        "number": 1,
        "orientation": "upright",
        "meaning": "Manifestation, power, and skillful action",
        "keywords": ["Manifestation", "Power", "Action", "Skill"],
        "element": "Air"
      },
      "interpretation": "The Magician appears in your reading, bringing significant life lessons...",
      "practicalAdvice": "Focus on integrating manifestation, power, action into your current situation..."
    },
    
    "resolutionPath": {
      "description": "The I-Ching hexagram with Ifá correspondence reveals the path toward resolution",
      "hexagram": {
        "number": 1,
        "name": "The Creative",
        "chineseName": "乾",
        "symbol": "䷀",
        "meaning": "Great creative power and dynamic energy",
        "trigrams": {
          "upper": "HEAVEN",
          "lower": "HEAVEN",
          "composition": "The Creative, Heaven above The Creative, Heaven"
        }
      },
      "ifa": {
        "odu": "Ogbe + Otura",
        "glyph": "𝍠",
        "components": {
          "primary": "Ogbe",
          "secondary": "Otura"
        }
      },
      "isChanging": false,
      "wisdomText": "Hexagram 1: The Creative corresponds to the Ifá Odu Ogbe + Otura..."
    }
  },
  
  "guidance": {
    "overallMessage": "The oracle reveals a reading centered on strength and creativity...",
    
    "actionableInsights": [
      {
        "priority": "high",
        "category": "immediate",
        "action": "Focus on cultivating strength in your current situation",
        "rationale": "The Uruz rune in your present position emphasizes this energy"
      },
      {
        "priority": "high",
        "category": "short-term",
        "action": "Engage with the themes of manifestation and power",
        "rationale": "The Magician card illuminates your current path"
      }
    ],
    
    "timing": {
      "urgency": "gradual",
      "description": "This is a period for patient, steady progress...",
      "phaseOfChange": "stable"
    },
    
    "considerations": {
      "strengths": [
        "Strong foundation from Uruz energy in your past",
        "Current alignment with The Magician themes"
      ],
      "challenges": [
        "Maintaining balance with The Magician energy",
        "Exercising patience during stable period"
      ],
      "opportunities": [
        "Leveraging Fehu potential in the future",
        "Applying manifestation to current challenges"
      ]
    },
    
    "applicationContext": {
      "personal": "In your personal development, this reading emphasizes strength and manifestation...",
      "professional": "For career matters, consider how The Magician energy can be channeled...",
      "spiritual": "Spiritually, this reading invites contemplation of Uruz energy...",
      "relational": "In relationships, The Magician card suggests approaching interactions..."
    }
  },
  
  "metadata": {
    "readingType": "unified-oracle",
    "systemsUsed": ["Elder Futhark Runes", "Tarot", "I-Ching", "Ifá"],
    "processingTimeMs": 234,
    "symbolsCount": {
      "runes": 3,
      "tarot": 1,
      "hexagrams": 1
    }
  },
  
  "promptHelpers": {
    "contextSummary": "This oracle reading combines Runes (Uruz, Kenaz, Fehu), Tarot (The Magician), and I-Ching (Hexagram 1: The Creative) to address: 'What guidance do I need?'. Primary themes include Strength, Creativity, Power.",
    
    "responseFraming": "When responding to the user, adopt an empowering tone. This is a moderate reading with high thematic coherence. Emphasize the connection between past influences, present energy, and future potential.",
    
    "emphasisPoints": [
      "The Kenaz rune in the present position",
      "The Magician card's upright orientation",
      "Hexagram 1: The Creative",
      "The stability of the hexagram",
      "Key themes: Strength and Creativity"
    ]
  }
}
```

### Key Features for AI Agents

1. **Executive Summary**: Quick access to primary message, themes, and suggested tone
2. **Structured Guidance**: Actionable insights with priority, category, and rationale
3. **Confidence Scoring**: Algorithmic assessment of reading coherence (0-1 scale)
4. **Complexity Assessment**: Simple/Moderate/Complex classification
5. **Prompt Helpers**: Ready-to-use context summaries and response framing
6. **Application Contexts**: Pre-generated interpretations for different life areas
7. **SWOT Analysis**: Strengths, challenges, and opportunities clearly identified
8. **Timing Guidance**: Urgency and phase of change indicators
9. **Metadata**: Processing time, systems used, and version tracking

### Use Cases

- **AI Chatbots**: Use `promptHelpers.contextSummary` and `promptHelpers.responseFraming` to construct natural responses
- **Automated Guidance Systems**: Extract `actionableInsights` for step-by-step recommendations
- **Multi-Agent Systems**: Use `requestedBy` parameter to track which agent requested the reading
- **Analytics**: Leverage `metadata` and `confidence` scores for quality assessment
- **Context-Aware Responses**: Use `applicationContext` to tailor responses to specific life areas

### Differences from Standard Unified Oracle

| Feature | Unified Oracle | AI-Optimized Oracle |
|---------|---------------|---------------------|
| Response Structure | Nested objects | Flattened, predictable structure |
| Metadata | Minimal | Extensive (confidence, complexity, timing) |
| Guidance Format | Narrative text | Structured arrays with priorities |
| Prompt Helpers | None | Context summaries, framing, emphasis points |
| Application Contexts | None | Personal, professional, spiritual, relational |
| Actionable Insights | Embedded in text | Extracted with priority/category/rationale |
| Tone Guidance | Implicit | Explicit (`suggestedTone` field) |
| SWOT Analysis | None | Strengths, challenges, opportunities |
| Tracking | None | Unique ID, version, requestedBy support |

---

## AI-Optimized Oracle Reading

⭐ **Specifically designed for AI/LLM agents** - Comprehensive reading with structured, machine-readable guidance optimized for AI consumption and interpretation.

### Endpoint
```
POST /api/ai-oracle
```

### Overview

This endpoint provides the same comprehensive divination reading as the Unified Oracle but with a response structure specifically optimized for AI agents and LLM consumption. It includes:

- **Executive summaries** for quick parsing
- **Structured guidance** with clear categorization
- **Confidence scores** and complexity indicators
- **Actionable insights** with priority levels
- **Prompt helpers** for LLM context integration
- **Multiple application contexts** (personal, professional, spiritual, relational)

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `question` | string | Yes | The question or topic for the comprehensive reading |
| `requestedBy` | string | No | Identifier for the AI agent making the request |
| `context` | string | No | Additional context about the reading request |

### Request Example

```bash
curl -X POST http://localhost:4545/api/ai-oracle \
  -H "Content-Type: application/json" \
  -d '{
    "question": "What guidance do I need for my current situation?",
    "requestedBy": "assistant-gpt4",
    "context": "User seeking career advice"
  }'
```

### Response Schema

```typescript
{
  // Unique tracking identifier
  id: string;                    // e.g., "ai-reading-1732584000000-a1b2c3d4"
  version: string;               // API version: "1.0.0"
  timestamp: string;             // ISO 8601 timestamp
  
  // Original query context
  query: {
    question: string;
    requestedBy?: string;        // AI agent identifier
    context?: string;            // Additional context
  };
  
  // Executive summary for quick LLM parsing
  summary: {
    primaryMessage: string;      // High-level synthesis paragraph
    keyThemes: string[];         // 5 main themes extracted
    suggestedTone: string;       // 'thoughtful' | 'empowering' | 'cautious' | 'encouraging' | 'reflective'
    confidence: number;          // 0-1 scale based on thematic alignment
    complexity: string;          // 'simple' | 'moderate' | 'complex'
  };
  
  // Detailed reading sections
  reading: {
    // Past-Present-Future temporal analysis
    temporalGuidance: {
      description: string;
      past: {
        symbol: string;          // Unicode rune character
        symbolName: string;      // Rune name
        orientation: string;     // 'upright' | 'reversed'
        meaning: string;         // Full interpretation
        influence: string;       // How it affects the reading
        keywords: string[];      // Key concepts
        element: string;         // Associated element
      };
      present: { /* same structure */ };
      future: { /* same structure */ };
      narrative: string;         // Synthesized temporal story
    };
    
    // Current situation/energy
    currentEnergy: {
      description: string;
      card: {
        name: string;            // Tarot card name
        arcana: string;          // 'major' | 'minor'
        suit?: string;           // For minor arcana
        number?: number;         // Card number
        orientation: string;     // 'upright' | 'reversed'
        meaning: string;         // Full interpretation
        keywords: string[];      // Key concepts
        element?: string;        // Associated element
      };
      interpretation: string;    // Contextual interpretation
      practicalAdvice: string;   // Actionable guidance
    };
    
    // Resolution path with ancient wisdom
    resolutionPath: {
      description: string;
      hexagram: {
        number: number;          // 1-64
        name: string;            // English name
        chineseName: string;     // Traditional Chinese
        symbol: string;          // Unicode hexagram
        meaning: string;         // Wilhelm interpretation
        trigrams: {
          upper: string;         // Upper trigram
          lower: string;         // Lower trigram
          composition: string;   // Description of combination
        };
      };
      ifa: {
        odu: string;             // Ifá Odu name
        glyph: string;           // Ifá glyph
        components: {
          primary: string;       // Primary Odu
          secondary: string;     // Secondary Odu
        };
      };
      isChanging: boolean;       // Whether hexagram has changing lines
      changingGuidance?: {
        description: string;
        lines: Array<{
          position: number;      // Line number 1-6
          text: string;          // Line text
          meaning: string;       // Interpretation
        }>;
        transformsTo?: {
          number: number;        // Target hexagram
          name: string;          // Target name
          symbol: string;        // Target symbol
          meaning: string;       // Target meaning
        };
      };
      wisdomText: string;        // Synthesized wisdom
    };
  };
  
  // Synthesized guidance optimized for LLM
  guidance: {
    overallMessage: string;      // Complete synthesis
    
    // Actionable insights with priority
    actionableInsights: Array<{
      priority: string;          // 'high' | 'medium' | 'low'
      category: string;          // 'immediate' | 'short-term' | 'long-term'
      action: string;            // What to do
      rationale: string;         // Why it matters
    }>;
    
    // Timing guidance
    timing: {
      urgency: string;           // 'immediate' | 'soon' | 'gradual' | 'patient'
      description: string;       // Temporal context
      phaseOfChange: string;     // 'beginning' | 'middle' | 'completion' | 'stable'
    };
    
    // Balanced perspective
    considerations: {
      strengths: string[];       // Advantages and assets
      challenges: string[];      // Obstacles and difficulties
      opportunities: string[];   // Potential and possibilities
    };
    
    // Multi-domain application
    applicationContext: {
      personal: string;          // Personal development context
      professional: string;      // Career/work context
      spiritual: string;         // Spiritual/inner context
      relational: string;        // Relationship context
    };
  };
  
  // Processing metadata
  metadata: {
    readingType: string;         // 'unified-oracle'
    systemsUsed: string[];       // Systems involved
    processingTimeMs: number;    // Processing duration
    symbolsCount: {
      runes: number;             // Number of runes drawn
      tarot: number;             // Number of tarot cards
      hexagrams: number;         // Number of hexagrams (1-2)
    };
  };
  
  // Prompt helpers for LLM integration
  promptHelpers: {
    contextSummary: string;      // Ready-to-use context for prompts
    responseFraming: string;     // Suggested response approach
    emphasisPoints: string[];    // Key points to highlight
  };
}
```

### Response Example (Simplified)

```json
{
  "id": "ai-reading-1732584000000-a1b2c3d4",
  "version": "1.0.0",
  "timestamp": "2025-11-26T10:30:00.000Z",
  "query": {
    "question": "What guidance do I need for my current situation?",
    "requestedBy": "assistant-gpt4"
  },
  "summary": {
    "primaryMessage": "The oracle reveals a reading centered on transformation and courage. The Magician illuminates your current path, while Hexagram 1 (The Creative) provides ancient wisdom for resolution. The stable hexagram suggests maintaining your current course.",
    "keyThemes": ["strength", "manifestation", "power", "Fire", "stability"],
    "suggestedTone": "empowering",
    "confidence": 0.85,
    "complexity": "moderate"
  },
  "reading": {
    "temporalGuidance": {
      "description": "Three runes reveal your path through time using the Norns spread",
      "past": {
        "symbol": "ᚢ",
        "symbolName": "Uruz",
        "orientation": "upright",
        "meaning": "Strength and primal power have shaped your foundation...",
        "influence": "The Uruz rune in your past indicates foundational energies...",
        "keywords": ["strength", "vitality", "endurance"],
        "element": "Earth"
      },
      "present": { "..." },
      "future": { "..." },
      "narrative": "Your journey begins with Uruz, representing strength in your past..."
    },
    "currentEnergy": {
      "description": "A single Tarot card reveals the energy of your current path",
      "card": {
        "name": "The Magician",
        "arcana": "major",
        "orientation": "upright",
        "meaning": "The Magician represents manifestation and power...",
        "keywords": ["manifestation", "power", "action", "resourcefulness"],
        "element": "Air"
      },
      "interpretation": "The Magician appears in your reading, bringing significant life lessons...",
      "practicalAdvice": "Focus on integrating manifestation, power, action into your current situation..."
    },
    "resolutionPath": {
      "description": "The I-Ching hexagram with Ifá correspondence reveals resolution",
      "hexagram": {
        "number": 1,
        "name": "The Creative",
        "chineseName": "乾",
        "symbol": "䷀",
        "meaning": "Supreme creative power and heaven's blessing...",
        "trigrams": {
          "upper": "HEAVEN",
          "lower": "HEAVEN",
          "composition": "The Creative, Heaven above The Creative, Heaven"
        }
      },
      "ifa": {
        "odu": "Ogbe + Otura",
        "glyph": "𝍠",
        "components": {
          "primary": "Ogbe",
          "secondary": "Otura"
        }
      },
      "isChanging": false,
      "wisdomText": "Hexagram 1: The Creative corresponds to the Ifá Odu Ogbe + Otura..."
    }
  },
  "guidance": {
    "overallMessage": "The oracle reveals a reading centered on transformation and courage...",
    "actionableInsights": [
      {
        "priority": "high",
        "category": "immediate",
        "action": "Focus on cultivating strength in your current situation",
        "rationale": "The Uruz rune in your present position emphasizes this energy"
      },
      {
        "priority": "high",
        "category": "short-term",
        "action": "Engage with the themes of manifestation and power",
        "rationale": "The Magician card illuminates your current path"
      }
    ],
    "timing": {
      "urgency": "gradual",
      "description": "This is a period for patient, steady progress...",
      "phaseOfChange": "stable"
    },
    "considerations": {
      "strengths": [
        "Strong foundation from Uruz energy in your past",
        "Current alignment with The Magician themes",
        "Ancient wisdom of The Creative provides guidance"
      ],
      "challenges": [
        "Maintaining balance with The Magician energy",
        "Exercising patience during stable period"
      ],
      "opportunities": [
        "Leveraging Kenaz potential in the future",
        "Applying manifestation to current challenges",
        "Building sustainable foundations"
      ]
    },
    "applicationContext": {
      "personal": "In your personal development, this reading emphasizes strength and manifestation...",
      "professional": "For career matters, consider how The Magician energy can be channeled...",
      "spiritual": "Spiritually, this reading invites contemplation of Uruz energy...",
      "relational": "In relationships, The Magician card suggests approaching with manifestation..."
    }
  },
  "metadata": {
    "readingType": "unified-oracle",
    "systemsUsed": ["Elder Futhark Runes", "Tarot", "I-Ching", "Ifá"],
    "processingTimeMs": 245,
    "symbolsCount": {
      "runes": 3,
      "tarot": 1,
      "hexagrams": 1
    }
  },
  "promptHelpers": {
    "contextSummary": "This oracle reading combines Runes (Uruz, Kenaz, Fehu), Tarot (The Magician), and I-Ching (Hexagram 1: The Creative) to address: 'What guidance do I need for my current situation?'. Primary themes include strength, manifestation, power.",
    "responseFraming": "When responding to the user, adopt an empowering tone. This is a moderate reading with high thematic coherence. Emphasize the connection between past influences, present energy, and future potential.",
    "emphasisPoints": [
      "The Kenaz rune in the present position",
      "The Magician card's upright orientation",
      "Hexagram 1: The Creative",
      "The stability of the hexagram",
      "Key themes: strength and manifestation"
    ]
  }
}
```

### AI Integration Guide

#### Using the Response in Your AI Agent

```python
# Example: Python AI agent integration
import requests
import json

def consult_oracle(question: str, agent_id: str = "my-ai-agent"):
    response = requests.post(
        "http://localhost:4545/api/ai-oracle",
        json={
            "question": question,
            "requestedBy": agent_id
        }
    )
    reading = response.json()
    
    # Extract key information for AI processing
    context = reading["promptHelpers"]["contextSummary"]
    tone = reading["summary"]["suggestedTone"]
    primary_message = reading["summary"]["primaryMessage"]
    actionable_insights = reading["guidance"]["actionableInsights"]
    
    # Build AI prompt with oracle context
    ai_prompt = f"""
    {reading["promptHelpers"]["responseFraming"]}
    
    Oracle Reading Context:
    {context}
    
    Primary Message:
    {primary_message}
    
    Please provide a {tone} response that incorporates these insights.
    """
    
    return ai_prompt, reading

# Usage
prompt, oracle_data = consult_oracle("How should I approach my new project?")
# Use prompt with your LLM API
```

#### Quick Start for LLM Integration

```javascript
// Example: JavaScript/TypeScript integration
async function getOracleGuidance(question: string) {
  const response = await fetch('http://localhost:4545/api/ai-oracle', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question })
  });
  
  const reading = await response.json();
  
  // Direct LLM prompt construction
  const llmContext = `
    ${reading.promptHelpers.contextSummary}
    
    Tone: ${reading.summary.suggestedTone}
    Confidence: ${(reading.summary.confidence * 100).toFixed(0)}%
    
    Key Guidance:
    ${reading.guidance.actionableInsights.map(insight => 
      `- ${insight.action} (${insight.priority} priority)`
    ).join('\n')}
  `;
  
  return {
    context: llmContext,
    rawReading: reading,
    emphasisPoints: reading.promptHelpers.emphasisPoints
  };
}
```

### Key Features for AI Agents

1. **Confidence Scoring**: Use `summary.confidence` (0-1) to gauge reading coherence
2. **Complexity Assessment**: Adjust response depth based on `summary.complexity`
3. **Priority Sorting**: Action insights include priority levels for ranking
4. **Multi-Domain Context**: Apply reading across personal/professional/spiritual/relational domains
5. **Temporal Awareness**: Use `timing.urgency` and `timing.phaseOfChange` for temporal framing
6. **Tone Guidance**: `summary.suggestedTone` indicates optimal response tone
7. **Ready-to-Use Context**: `promptHelpers.contextSummary` provides immediate LLM context
8. **Emphasis Points**: `promptHelpers.emphasisPoints` highlight what to stress in responses

### Response Time

Typical processing time: **200-400ms**

The endpoint makes internal calls to generate the full unified reading, so expect slightly longer response times than individual oracle endpoints.

---

## Hexagram Lookup

Retrieve detailed information about a specific I-Ching hexagram by its number.

### Endpoint
```
GET /api/hexagram/[id]
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | number | Yes | Hexagram number (1-64) - provided in URL path |

### Request Example

```bash
curl http://localhost:4545/api/hexagram/1
```

### Response Schema

```typescript
{
  hex_font: string;            // Unicode hexagram symbol
  english: string;             // English name
  trad_chinese: string;        // Traditional Chinese name
  pinyin: string;              // Pinyin romanization
  binary: number;              // Binary representation
  wilhelm_above: {
    alchemical: string;
    binary: string;
    chinese: string;
    english: string;
    pinyin: string;
  };
  wilhelm_below: { ... };      // Same structure as above
  wilhelm_judgment: {
    text: string;
    comments: string;
  };
  wilhelm_image: {
    text: string;
    comments: string;
  };
  wilhelm_lines: {
    "1": { text: string; comments: string; };
    "2": { text: string; comments: string; };
    // ... through line 6
  };
  // Additional fields for symbolic, structural analysis, etc.
}
```

### Response Example

```json
{
  "hex_font": "䷀",
  "english": "The Creative",
  "trad_chinese": "乾",
  "pinyin": "qián",
  "binary": 111111,
  "wilhelm_above": {
    "alchemical": "HEAVEN",
    "binary": "111",
    "chinese": "乾",
    "english": "The Creative, Heaven",
    "pinyin": "qián"
  },
  "wilhelm_below": { ... },
  "wilhelm_judgment": {
    "text": "THE CREATIVE works sublime success...",
    "comments": "According to the original meaning..."
  }
}
```

---

## Health Check

Simple endpoint to verify API availability.

### Endpoint
```
GET /api/health
```

### Parameters

None

### Response

```json
{
  "status": "ok",
  "timestamp": "2025-11-25T10:30:00.000Z"
}
```

**Note:** This endpoint is currently not implemented and needs to be created.

---

## Error Responses

All endpoints follow consistent error response patterns:

### 400 Bad Request
```json
{
  "error": "Invalid or missing parameter description"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 405 Method Not Allowed
```json
{
  "error": "Method Not Allowed"
}
```

### 500 Internal Server Error
```json
{
  "error": "Failed to generate reading"
}
```

---

## CORS Support

All endpoints support CORS (Cross-Origin Resource Sharing) and handle OPTIONS preflight requests automatically.

---

## Rate Limiting

Currently, no rate limiting is implemented. Consider implementing rate limiting for production deployments.

---

## Best Practices

1. **Always provide a question**: While optional for most endpoints, providing a meaningful question improves the contextual relevance of interpretations.

2. **Handle reversed cards/runes**: Both Tarot and Rune readings include reversal information. Make sure your client handles both upright and reversed interpretations.

3. **Check for changing lines**: In I-Ching readings, check the `hasChanging` field to determine if transformation guidance is available.

4. **Use the Unified Oracle for comprehensive guidance**: When seeking deep insight, the Unified Oracle endpoint provides synthesis across all three systems.

5. **Cache hexagram lookups**: Hexagram data is static and can be cached on the client side to reduce API calls.

---

## Development & Testing

### Starting the Development Server

```bash
npm run dev
```

The API will be available at `http://localhost:4545`

### Testing Endpoints

Use the provided console pages for interactive testing:
- Traditional I-Ching: `/console/traditional`
- Ifá: `/console/ifa`
- Runes: `/console/runes`
- Tarot: `/console/tarot`
- Unified Oracle: `/console/unified`
- Hexagram Lookup: `/console/lookup`

### Testing the AI Oracle Endpoint

```bash
# Quick test with curl
curl -X POST http://localhost:4545/api/ai-oracle \
  -H "Content-Type: application/json" \
  -d '{"question": "What should I focus on today?"}' | jq .

# Test with agent identifier
curl -X POST http://localhost:4545/api/ai-oracle \
  -H "Content-Type: application/json" \
  -d '{
    "question": "How can I improve my work-life balance?",
    "requestedBy": "test-agent-v1",
    "context": "User seeking wellness advice"
  }' | jq '.summary'
```

---

## Support

For issues, questions, or feature requests, please refer to the project repository or documentation.

---

## Endpoint Comparison

| Endpoint | Best For | Complexity | Response Size | AI-Friendly |
|----------|----------|------------|---------------|-------------|
| `/api/reading` | Traditional I-Ching divination | Medium | Medium | ⭐⭐⭐ |
| `/api/ifa-reading` | Yoruba tradition seekers | Medium | Medium | ⭐⭐⭐ |
| `/api/rune-reading` | Nordic tradition, quick draws | Low-Medium | Small-Medium | ⭐⭐⭐⭐ |
| `/api/tarot-reading` | Tarot spreads and draws | Low-High | Small-Large | ⭐⭐⭐⭐ |
| `/api/unified-oracle` | Comprehensive multi-system readings | High | Large | ⭐⭐⭐⭐ |
| `/api/ai-oracle` | **AI/LLM agent consumption** | High | Large | ⭐⭐⭐⭐⭐ |
| `/api/hexagram/[id]` | Reference lookups | Low | Medium | ⭐⭐⭐ |

**Last Updated:** November 26, 2025
