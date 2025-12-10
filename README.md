# Oráculo - Oracle API Engine

A RESTful API engine for divination readings combining I-Ching, Yoruba Ifá, Runes, and Tarot. Includes a web frontend for interactive testing.

---

## Quick Start

```bash
git clone https://github.com/absolemlee/oraculo.git
cd oraculo
./setup.sh
npm run dev
```

API available at **http://localhost:4545**

---

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Development](#development)
- [Project Structure](#project-structure)

---

## Overview

**Oráculo** is an oracular response engine accessible via RESTful API. It bridges multiple divination traditions through mathematical correspondences:

- **I-Ching (易經)**: 64 hexagrams via three-coin method
- **Yoruba Ifá**: 256 odù mapped through trigram correspondences
- **Elder Futhark Runes**: 24 runes with reversal states
- **Tarot**: 78-card deck with multiple spread types

The engine returns structured JSON responses suitable for direct consumption by applications, AI agents, or human interpretation through the included web interface.

**Technology Stack:**
- Next.js 15.3.3 (API routes + frontend)
- TypeScript 5.8.3
- Node.js 22.21.1+
- Port 4545 (fixed)

---

## Installation

### Prerequisites

- **Node.js** 22.0.0+ (22.21.1 recommended)
- **npm** 9.0.0+
- **nvm** (recommended for version management)

### Method 1: Automated Setup (Recommended)

```bash
git clone https://github.com/absolemlee/oraculo.git
cd oraculo
./setup.sh
```

The script will:
1. Install nvm if not present
2. Install correct Node.js version
3. Install dependencies
4. Run type checking
5. Build the application

### Method 2: Manual Setup

```bash
# Clone repository
git clone https://github.com/absolemlee/oraculo.git
cd oraculo

# Install Node version (via nvm)
nvm install
nvm use

# Install dependencies
npm install

# Verify installation
npm run type-check
npm run lint

# Build for production
npm run build
```

### Start the Server

**Development mode** (with hot reload):
```bash
npm run dev
```

**Production mode**:
```bash
npm start
```

Server binds to **http://localhost:4545**

---

## API Endpoints

All endpoints return JSON and support CORS. The API runs on port **4545**.

### 1. Traditional I-Ching Reading

Generate a hexagram using the three-coin method with changing lines.

**Endpoint:** `GET /api/reading` or `POST /api/reading`

**Parameters:**
- `question` (string, optional): The divination question

**Example Request:**
```bash
curl "http://localhost:4545/api/reading?question=What%20should%20I%20focus%20on"
```

**Response:**
```json
{
  "question": "What should I focus on",
  "number": 15,
  "details": {
    "hex": 15,
    "hex_font": "䷎",
    "english": "Modesty",
    "judgement": "...",
    "image": "..."
  },
  "hasChanging": true,
  "changingLineDetails": [
    {
      "line": 2,
      "text": "Six in the second place...",
      "comments": "..."
    }
  ],
  "transformedNumber": 39,
  "transformedDetails": { /* hexagram 39 data */ }
}
```

---

### 2. Ifá Correspondence Reading

I-Ching reading with Yoruba Ifá odù correspondences.

**Endpoint:** `POST /api/ifa-reading`

**Parameters:**
- `question` (string, optional): The divination question

**Example Request:**
```bash
curl -X POST http://localhost:4545/api/ifa-reading \
  -H "Content-Type: application/json" \
  -d '{"question": "Guide my path"}'
```

**Response:**
```json
{
  "question": "Guide my path",
  "hexagram": {
    "number": 1,
    "symbol": "䷀",
    "english": "The Creative"
  },
  "ifa": {
    "primary": "Ogbe",
    "primaryGlyph": "◯\n◯\n◯\n◯",
    "secondary": "Ogbe",
    "secondaryGlyph": "◯\n◯\n◯\n◯"
  },
  "changingLines": null,
  "transformed": null,
  "timestamp": "2025-12-10T..."
}
```

**Glyph Notation:**
- `◯` = double line (yin/even)
- `┃` = single line (yang/odd)

---

### 3. Rune Reading

Draw Elder Futhark runes in single or Norns spread (Past/Present/Future).

**Endpoint:** `POST /api/rune-reading`

**Parameters:**
- `question` (string, optional): The divination question
- `type` (string, optional): `"single"` or `"norns"` (default: `"single"`)

**Example Request:**
```bash
curl -X POST http://localhost:4545/api/rune-reading \
  -H "Content-Type: application/json" \
  -d '{"question": "What energy surrounds me?", "type": "norns"}'
```

**Response (Norns Spread):**
```json
{
  "type": "norns",
  "past": {
    "name": "Fehu",
    "meaning": "Cattle, Wealth",
    "reversed": false,
    "interpretation": "...",
    "reversedInterpretation": null
  },
  "present": { /* similar structure */ },
  "future": { /* similar structure */ },
  "timestamp": "2025-12-10T...",
  "question": "What energy surrounds me?"
}
```

---

### 4. Tarot Reading

Draw from the 78-card deck with customizable spreads.

**Endpoint:** `POST /api/tarot-reading`

**Parameters:**
- `readingType` (string, required): `"single"`, `"spread"`, or `"custom"`
- `spreadName` (string, conditional): Required if `readingType` is `"spread"`
  - Options: `"three-card"`, `"celtic-cross"`, `"relationship"`, `"decision"`, `"career"`
- `cardCount` (number, conditional): Required if `readingType` is `"custom"` (1-10)

**Example Request:**
```bash
curl -X POST http://localhost:4545/api/tarot-reading \
  -H "Content-Type: application/json" \
  -d '{"readingType": "spread", "spreadName": "three-card"}'
```

**Response:**
```json
{
  "type": "spread",
  "spreadName": "three-card",
  "positions": [
    {
      "position": "Past",
      "card": {
        "name": "The Fool",
        "suit": "Major Arcana",
        "number": 0,
        "reversed": false,
        "meaning": "...",
        "reversedMeaning": null
      }
    },
    { "position": "Present", "card": { /* ... */ } },
    { "position": "Future", "card": { /* ... */ } }
  ],
  "timestamp": "2025-12-10T..."
}
```

---

### 5. Unified Oracle

Comprehensive reading combining all systems: Runes (Norns), Tarot (single), I-Ching, and Ifá.

**Endpoint:** `POST /api/unified-oracle`

**Parameters:**
- `question` (string, required): The divination question

**Example Request:**
```bash
curl -X POST http://localhost:4545/api/unified-oracle \
  -H "Content-Type: application/json" \
  -d '{"question": "What do I need to know right now?"}'
```

**Response:**
```json
{
  "question": "What do I need to know right now?",
  "runes": {
    "type": "norns",
    "past": { /* rune data */ },
    "present": { /* rune data */ },
    "future": { /* rune data */ }
  },
  "tarot": {
    "type": "single",
    "card": { /* tarot card data */ }
  },
  "iching": {
    "hexagram": { /* hexagram data */ },
    "changingLines": [ /* changing lines */ ],
    "transformed": { /* transformed hexagram */ }
  },
  "ifa": {
    "primary": "Ogbe",
    "primaryGlyph": "◯\n◯\n◯\n◯",
    "secondary": "Oyeku",
    "secondaryGlyph": "┃\n┃\n┃\n┃"
  },
  "timestamp": "2025-12-10T..."
}
```

---

### 6. AI-Optimized Oracle

Structured response optimized for AI/LLM consumption with executive summaries, confidence scores, and actionable insights.

**Endpoint:** `POST /api/ai-oracle`

**Parameters:**
- `question` (string, required): The divination question
- `requestedBy` (string, optional): Agent identifier for tracking
- `context` (string, optional): Additional situational context

**Example Request:**
```bash
curl -X POST http://localhost:4545/api/ai-oracle \
  -H "Content-Type: application/json" \
  -d '{
    "question": "How should I approach this decision?",
    "requestedBy": "my-ai-agent",
    "context": "Career transition opportunity"
  }'
```

**Response Structure:**
```json
{
  "id": "ai-reading-1702234800000-a1b2c3d4",
  "question": "How should I approach this decision?",
  "timestamp": "2025-12-10T...",
  "requestedBy": "my-ai-agent",
  "context": "Career transition opportunity",
  
  "summary": {
    "primaryMessage": "Main insight...",
    "themes": ["change", "opportunity", "caution"],
    "confidence": 0.82,
    "complexity": "Moderate",
    "suggestedTone": "Supportive and encouraging"
  },
  
  "reading": {
    "runes": { /* norns spread */ },
    "tarot": { /* single card */ },
    "iching": { /* hexagram + ifa */ }
  },
  
  "guidance": {
    "actionableInsights": [
      {
        "insight": "Consider timing carefully",
        "priority": "high",
        "category": "timing",
        "rationale": "Changing lines suggest transition"
      }
    ],
    "swot": {
      "strengths": ["..."],
      "challenges": ["..."],
      "opportunities": ["..."]
    }
  },
  
  "promptHelpers": {
    "contextSummary": "Summary for LLM context...",
    "responseFraming": "How to frame the response...",
    "emphasisPoints": ["Point 1", "Point 2"]
  },
  
  "metadata": {
    "processingTime": 245,
    "systemsUsed": ["runes", "tarot", "iching", "ifa"],
    "version": "1.0.0"
  }
}
```

---

### 7. Hexagram Lookup

Retrieve specific hexagram data by number.

**Endpoint:** `GET /api/hexagram/:id`

**Parameters:**
- `id` (number, URL parameter): Hexagram number (1-64)

**Example Request:**
```bash
curl http://localhost:4545/api/hexagram/1
```

**Response:**
```json
{
  "hex": 1,
  "hex_font": "䷀",
  "trad_chinese": "乾",
  "pinyin": "qián",
  "english": "The Creative",
  "wilhelm_above": {
    "alchemical": "HEAVEN",
    "chinese": "天",
    "pinyin": "Qián"
  },
  "wilhelm_below": { /* same structure */ },
  "judgement": "THE CREATIVE works sublime success...",
  "image": "The movement of heaven is full of power...",
  "lines": {
    "1": { "text": "...", "comments": "..." },
    /* lines 2-6 */
  }
}
```

---

## Environment Variables

Currently, the application uses minimal environment configuration. Port 4545 is hardcoded in `package.json`.

### Optional Variables

Create `.env.local` for optional configuration:

```bash
# Application URL (used for internal API calls)
NEXT_PUBLIC_APP_URL=http://localhost:4545

# Node environment
NODE_ENV=development
```

**Note:** `.env.local` is gitignored and will not be committed.

### Future Environment Variables

Planned support for:
- Custom port configuration
- Database connection strings
- API keys for extended features
- Logging configuration

---

## Deployment

### Production Build

```bash
npm run build
npm start
```

The production server will start on port 4545.

### Using PM2 (Process Manager)

```bash
# Install PM2 globally
npm install -g pm2

# Start with ecosystem file
pm2 start ecosystem.config.js

# View logs
pm2 logs oraculo

# Restart
pm2 restart oraculo
```

The included `ecosystem.config.js` is pre-configured for port 4545.

### Docker Deployment

Create `Dockerfile`:

```dockerfile
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 4545

CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t oraculo .
docker run -p 4545:4545 oraculo
```

### Reverse Proxy (Nginx)

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:4545;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## Development

### Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build production bundle |
| `npm start` | Start production server |
| `npm run lint` | Check code with ESLint |
| `npm run lint:fix` | Auto-fix ESLint issues |
| `npm run format` | Format code with Prettier |
| `npm run type-check` | TypeScript type checking |

### Interactive Console

The frontend provides interactive testing pages:

- **http://localhost:4545/console/traditional** - I-Ching casting
- **http://localhost:4545/console/ifa** - Ifá correspondences
- **http://localhost:4545/console/runes** - Rune casting
- **http://localhost:4545/console/tarot** - Tarot spreads
- **http://localhost:4545/console/unified** - All systems
- **http://localhost:4545/console/ai-oracle** - AI-optimized
- **http://localhost:4545/console/lookup** - Hexagram lookup

### Code Quality

Before committing:

```bash
npm run lint:fix
npm run format
npm run type-check
```

### Adding New Endpoints

1. Create handler in `pages/api/your-endpoint.ts`
2. Implement the endpoint logic
3. Add CORS support using `lib/cors.ts`
4. Document in this README
5. Add tests in `__tests__/`

---

## Project Structure

```
oraculo/
├── pages/
│   ├── api/                    # API route handlers
│   │   ├── reading.ts          # Traditional I-Ching
│   │   ├── ifa-reading.ts      # Ifá correspondences
│   │   ├── rune-reading.ts     # Rune casting
│   │   ├── tarot-reading.ts    # Tarot reading
│   │   ├── unified-oracle.ts   # All systems
│   │   ├── ai-oracle.ts        # AI-optimized
│   │   └── hexagram/[id].ts    # Hexagram lookup
│   ├── console/                # Interactive testing pages
│   ├── dashboard/              # Dashboard UI
│   └── index.tsx               # Homepage
│
├── lib/                        # Core utilities
│   ├── hexagramUtils.ts        # I-Ching utilities
│   ├── ifaMapper.ts            # Hexagram ↔ Ifá mapping
│   ├── ifaMapping.ts           # Trigram ↔ Odù correspondences
│   ├── ifaRenderer.ts          # Glyph rendering
│   ├── cors.ts                 # CORS configuration
│   └── utils.ts                # General utilities
│
├── resources/                  # Static divination data
│   ├── iching/                 # I-Ching hexagram data
│   │   └── data/
│   │       ├── iching.ts       # Hexagram JSON
│   │       └── iching.db       # SQLite database
│   ├── runes/
│   │   └── runes.ts            # Elder Futhark data
│   └── tarot/
│       └── tarot.ts            # 78-card deck data
│
├── components/                 # React components (frontend)
├── styles/                     # Global CSS
├── __tests__/                  # Test files
│
├── setup.sh                    # Automated setup script
├── package.json                # Dependencies & scripts
├── tsconfig.json               # TypeScript config
├── next.config.js              # Next.js config
└── .nvmrc                      # Node version specification
```

---

## Philosophical Context

This project explores **inter-traditional correspondences** between divination systems:

- **I-Ching**: Binary trigram system (2³ = 64 hexagrams)
- **Ifá**: Quaternary system (2⁴ = 256 odù)
- **Runes**: 24-character alphabet with reversals
- **Tarot**: 78-card symbolic system

The approach respects each tradition's integrity while exploring mathematical and symbolic bridges. The I-Ching hexagram serves as an **intermediary lens** for mapping to other systems through trigram correspondences.

**For practitioners**: This tool supplements traditional practice, not replaces it. Cultural and ritualistic contexts are preserved; we cast through the I-Ching and correspond to equivalent systems.

---

## API Response Standards

All API endpoints follow consistent patterns:

- **JSON format**: All responses are `application/json`
- **CORS enabled**: Cross-origin requests supported
- **Timestamps**: ISO 8601 format (`YYYY-MM-DDTHH:mm:ss.sssZ`)
- **Error handling**: Appropriate HTTP status codes with error messages

**Error Response Format:**
```json
{
  "error": "Description of the error",
  "code": "ERROR_CODE"
}
```

**Common Status Codes:**
- `200 OK` - Successful request
- `400 Bad Request` - Invalid parameters
- `404 Not Found` - Resource not found
- `405 Method Not Allowed` - Incorrect HTTP method
- `500 Internal Server Error` - Server-side error

---

## Testing the API

### Using curl

```bash
# Test I-Ching
curl "http://localhost:4545/api/reading?question=Test"

# Test Unified Oracle
curl -X POST http://localhost:4545/api/unified-oracle \
  -H "Content-Type: application/json" \
  -d '{"question": "Test reading"}'

# Test specific hexagram
curl http://localhost:4545/api/hexagram/42
```

### Using the Console

Visit http://localhost:4545/console/unified for interactive testing with form inputs and formatted output.

---

## Additional Documentation

- **[API_ENDPOINTS.md](API_ENDPOINTS.md)** - Extended API reference with all response schemas and detailed examples
- **[COMPREHENSIVE_DEPLOYMENT_GUIDE.md](COMPREHENSIVE_DEPLOYMENT_GUIDE.md)** - Complete deployment guide with MVP assessment, architecture overview, production setup, monitoring, and roadmap

---

## License

See [LICENSE](LICENSE) file for details.

---

## Author

**Lee** ([@absolemlee](https://github.com/absolemlee))  
Email: [lee@absolemly.com](mailto:lee@absolemly.com)

A technologically inclined, programming priest of the arcane path.

---

## Version

**1.0.0** - Production-ready oracle API engine with multi-system support.

**Status**: Stable and actively maintained.

