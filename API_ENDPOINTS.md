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

---

## Support

For issues, questions, or feature requests, please refer to the project repository or documentation.

**Last Updated:** November 25, 2025
