# Oraculo API Documentation

**Version:** 1.0.0  
**Base URL:** `http://localhost:4545` (development) or your production domain  
**Content Type:** `application/json`

## Overview

Oraculo is a Next.js-based API for generating I-Ching (Yijing) oracle readings. The API provides endpoints for generating complete oracle readings and retrieving specific hexagram information. The system simulates traditional three-coin tosses to generate authentic hexagram patterns with changing lines, following classical I-Ching methodology.

## Architecture

- **Framework:** Next.js 15.3.3 with TypeScript
- **Data Source:** Wilhelm translation-based hexagram database (64 hexagrams)
- **Hosting:** Node.js server on port 4545
- **CORS:** Enabled for all origins (`*`)

---

## Endpoints

### 1. Generate Oracle Reading

#### `GET /api/reading`

Generates a complete I-Ching reading with optional question parameter.

**Parameters:**
- `question` (string, optional) - Query parameter containing the question to be answered

**Example Request:**
```http
GET /api/reading?question=What%20is%20my%20path%20forward
```

#### `POST /api/reading`

Generates a complete I-Ching reading with question in request body.

**Request Body:**
```json
{
  "question": "What is my path forward?"
}
```

**Response Format:**
Both GET and POST methods return the same response structure:

```json
{
  "question": "What is my path forward?",
  "number": 37,
  "details": {
    "hex": 37,
    "hex_font": "䷤",
    "trad_chinese": "家人",
    "pinyin": "jiārén",
    "english": "Household",
    "binary": 110101,
    "od": 40,
    "wilhelm_above": {
      "chinese": "SUN",
      "symbolic": "THE GENTLE,",
      "alchemical": "WIND"
    },
    "wilhelm_below": {
      "chinese": "LI",
      "symbolic": "THE CLINGING,",
      "alchemical": "FIRE"
    },
    "wilhelm_symbolic": "Complete hexagram description...",
    "wilhelm_judgment": {
      "text": "THE FAMILY. The perseverance of the woman furthers.",
      "comments": "Detailed judgment commentary..."
    },
    "wilhelm_image": {
      "text": "Wind comes forth from fire...",
      "comments": "Image interpretation..."
    },
    "wilhelm_lines": {
      "1": {
        "text": "Firm seclusion within the family...",
        "comments": "Line interpretation..."
      },
      // Lines 2-6 follow same structure
    }
  },
  "hasChanging": true,
  "transformedNumber": 39,
  "transformedDetails": {
    // Same structure as 'details' but for the transformed hexagram
  },
  "changingLineDetails": [
    {
      "line": 1,
      "text": "Firm seclusion within the family...",
      "comments": "Changing line interpretation..."
    },
    {
      "line": 6,
      "text": "His work commands respect...",
      "comments": "Changing line interpretation..."
    }
  ]
}
```

**Response Fields:**

| Field | Type | Description |
|-------|------|-------------|
| `question` | string | The question submitted (echoed back) |
| `number` | integer | Primary hexagram number (1-64) |
| `details` | object | Complete hexagram data object |
| `hasChanging` | boolean | Whether the reading contains changing lines |
| `transformedNumber` | integer\|null | Secondary hexagram number if changing lines exist |
| `transformedDetails` | object\|null | Complete transformed hexagram data |
| `changingLineDetails` | array | Array of changing line interpretations |

### 2. Generate Ifá-Focused Reading

#### `GET /api/ifa-reading`

Generates a simplified I-Ching reading focused on Ifá correspondences.

**Parameters:**
- `question` (string, optional) - Query parameter containing the question to be answered

**Example Request:**
```http
GET /api/ifa-reading?question=What%20path%20should%20I%20take
```

#### `POST /api/ifa-reading`

Generates a simplified I-Ching reading with question in request body.

**Request Body:**
```json
{
  "question": "What path should I take?"
}
```

**Response Format:**
```json
{
  "question": "What path should I take?",
  "hexagram": {
    "number": 37,
    "symbol": "䷤",
    "english": "Household"
  },
  "ifa": {
    "primary": "Obara + Iwori",
    "primaryGlyph": "┃\n◯\n┃\n┃\n---\n◯\n┃\n┃\n┃"
  },
  "changingLines": [
    {
      "line": 1,
      "text": "Firm seclusion within the family..."
    },
    {
      "line": 6,
      "text": "His work commands respect..."
    }
  ],
  "transformed": {
    "hexagram": {
      "number": 39,
      "symbol": "䷦",
      "english": "Hardship"
    },
    "ifa": {
      "secondary": "Idi + Owonrin",
      "secondaryGlyph": "◯\n◯\n┃\n┃\n---\n◯\n┃\n◯\n┃"
    }
  }
}
```

**Response Fields:**

| Field | Type | Description |
|-------|------|-------------|
| `question` | string | The question submitted (echoed back) |
| `hexagram.number` | integer | Primary hexagram number (1-64) |
| `hexagram.symbol` | string | Unicode hexagram symbol |
| `hexagram.english` | string | English hexagram name |
| `ifa.primary` | string | Primary Ifá odù combination name |
| `ifa.primaryGlyph` | string | Primary Ifá glyph rendered as ◯ and ┃ |
| `changingLines` | array\|null | Array of changing line texts (null if no changing lines) |
| `transformed` | object\|null | Transformed hexagram and Ifá data (null if no changing lines) |
| `transformed.ifa.secondary` | string | Secondary Ifá odù combination name |
| `transformed.ifa.secondaryGlyph` | string | Secondary Ifá glyph rendered as ◯ and ┃ |

### 3. Get Specific Hexagram

#### `GET /api/hexagram/[id]`

Retrieves complete information for a specific hexagram by ID.

**Parameters:**
- `id` (integer, required) - Hexagram number (1-64)

**Example Request:**
```http
GET /api/hexagram/1
```

**Response Format:**
```json
{
  "hex": 1,
  "hex_font": "䷀",
  "trad_chinese": "乾",
  "pinyin": "qián",
  "english": "Initiating",
  "binary": 111111,
  "od": "02",
  "wilhelm_above": {
    "chinese": "CH'IEN",
    "symbolic": "THE CREATIVE,",
    "alchemical": "HEAVEN"
  },
  "wilhelm_below": {
    "chinese": "CH'IEN",
    "symbolic": "THE CREATIVE,",
    "alchemical": "HEAVEN"
  },
  "wilhelm_symbolic": "Comprehensive hexagram meaning...",
  "wilhelm_judgment": {
    "text": "THE CREATIVE works sublime success...",
    "comments": "Detailed commentary on the judgment..."
  },
  "wilhelm_image": {
    "text": "The movement of heaven is full of power...",
    "comments": "Commentary on the symbolic image..."
  },
  "wilhelm_lines": {
    "1": {
      "text": "Hidden dragon. Do not act.",
      "comments": "Detailed line interpretation..."
    },
    "2": {
      "text": "Dragon appearing in the field...",
      "comments": "Detailed line interpretation..."
    },
    // Lines 3-6 follow same structure
  }
}
```

**Hexagram Data Structure:**

| Field | Type | Description |
|-------|------|-------------|
| `hex` | integer | Hexagram number (1-64) |
| `hex_font` | string | Unicode hexagram symbol |
| `trad_chinese` | string | Traditional Chinese name |
| `pinyin` | string | Romanized pronunciation |
| `english` | string | English name/translation |
| `binary` | integer | Binary representation of hexagram |
| `od` | string | Opposite/complementary hexagram |
| `wilhelm_above` | object | Upper trigram information |
| `wilhelm_below` | object | Lower trigram information |
| `wilhelm_symbolic` | string | Symbolic meaning explanation |
| `wilhelm_judgment` | object | Oracle judgment and commentary |
| `wilhelm_image` | object | Symbolic image and interpretation |
| `wilhelm_lines` | object | Individual line meanings (1-6) |

---

## Technical Details

### Hexagram Generation Algorithm

The API uses authentic I-Ching methodology:

1. **Line Generation:** Simulates three coin tosses per line
   - 3 heads = Changing Yang (9)
   - 2 heads = Yang (7) 
   - 1 head = Yin (6)
   - 0 heads = Changing Yin (8)

2. **Hexagram Assembly:** Generates 6 lines from bottom to top

3. **Binary Conversion:** Converts to binary pattern for hexagram identification
   - Yang/Changing Yang = 1
   - Yin/Changing Yin = 0

4. **Transformation:** If changing lines exist, generates future hexagram
   - Changing Yang becomes Yin
   - Changing Yin becomes Yang

### Error Handling

**400 Bad Request:**
```json
{
  "error": "Invalid hexagram ID"
}
```

**404 Not Found:**
```json
{
  "error": "Hexagram not found"
}
```

**405 Method Not Allowed:**
```json
{
  "error": "Method Not Allowed"
}
```

### CORS Configuration

All endpoints support CORS with the following headers:
- `Access-Control-Allow-Origin: *`
- `Access-Control-Allow-Methods: GET,POST,OPTIONS`
- `Access-Control-Allow-Headers: Content-Type, Authorization`

OPTIONS requests are handled and return 200 status.

---

## Usage Examples

### Basic Reading Request

```bash
curl -X GET "http://localhost:4545/api/reading?question=Should%20I%20change%20careers"
```

### Reading with JSON Body

```bash
curl -X POST "http://localhost:4545/api/reading" \
  -H "Content-Type: application/json" \
  -d '{"question": "What should I focus on this month?"}'
```

### Ifá Reading Request

```bash
curl -X GET "http://localhost:4545/api/ifa-reading?question=What%20should%20I%20focus%20on"
```

### Ifá Reading with JSON Body

```bash
curl -X POST "http://localhost:4545/api/ifa-reading" \
  -H "Content-Type: application/json" \
  -d '{"question": "What energies surround me now?"}'
```

### Get Specific Hexagram

```bash
curl -X GET "http://localhost:4545/api/hexagram/1"
```

### JavaScript Usage

```javascript
// Generate traditional reading
const response = await fetch('/api/reading', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    question: 'What is the nature of my current situation?'
  })
});
const reading = await response.json();

// Generate Ifá-focused reading
const ifaResponse = await fetch('/api/ifa-reading', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    question: 'What energies should I work with?'
  })
});
const ifaReading = await ifaResponse.json();

// Get specific hexagram
const hexagram = await fetch('/api/hexagram/15')
  .then(res => res.json());
```

---

## Data Sources

The API uses Wilhelm's translation of the I-Ching, containing:
- 64 hexagrams with complete interpretations
- Individual line meanings and changing line guidance
- Trigram correspondences (Chinese names, symbolic meanings, alchemical associations)
- Judgment texts and detailed commentaries
- Symbolic images and their interpretations

### Ifá Correspondence System

The Ifá mapping system provides:
- 8 trigram to Ifá odù correspondences (Qian→Ogbe, Kun→Oyeku, etc.)
- Visual glyph rendering using ┃ (single) and ◯ (double) marks
- Primary and secondary odù combinations for complete readings
- Traditional 4-line Ifá pattern representations
- Individual trigram names displayed separately (without "+" connector in frontend)

**Trigram to Ifá Mapping:**
- ☰ Qian → Ogbe (◯◯◯◯)
- ☱ Dui → Osa (◯┃┃◯)  
- ☲ Li → Obara (┃◯┃┃)
- ☳ Zhen → Irosun (┃◯◯┃)
- ☴ Xun → Iwori (◯┃┃┃)
- ☵ Kan → Owonrin (◯┃◯┃)
- ☶ Gen → Idi (◯◯┃┃)
- ☷ Kun → Oyeku (◯◯◯┃)

**Frontend Display Format:**
The frontend interface displays Ifá correspondences with:
- Lower trigram Ifá odù displayed first (left side) - cast first in divination
- Upper trigram Ifá odù displayed second (right side) - cast second in divination
- Individual odù names displayed below each vertical pattern
- Vertical Ifá patterns shown side by side without trigram labels
- Each pattern rendered as a vertical column of ◯ and ┃ symbols

All data is served from a pre-compiled JSON dataset for optimal performance.

---

## Production Considerations

### Security
- CORS is currently set to allow all origins (`*`)
- Consider restricting CORS origins in production
- No rate limiting implemented
- No authentication required

### Performance
- Data is loaded in memory for fast access
- No database queries required
- Stateless operations
- Consider adding caching headers for static hexagram data

### Monitoring
- No built-in logging or analytics
- Consider adding request logging
- Monitor response times and error rates
- Track usage patterns for capacity planning

### Deployment
- Requires Node.js runtime
- Default port 4545 (configurable)
- No external dependencies for data storage
- Stateless design allows horizontal scaling