# API Reference

This document describes the HTTP endpoints provided by **Oraculo**. The server runs on port **4545** when using either `npm run dev` or `npm start`.

## Starting the server

```bash
npm install
npm run dev    # or `npm start` for a production build
```

The application will be available at `http://localhost:4545`.

## Endpoints

### `GET /api/reading`
Generate a random I‑Ching reading. The optional `question` query parameter is echoed back in the response.

### `POST /api/reading`
Send a JSON body containing a `question` field and receive the full reading response.
Use this method when you prefer to provide the question in the request body instead of the query string.

**Example (GET)**
```http
GET http://localhost:4545/api/reading?question=What%20is%20my%20path
```

**Example (POST)**
```http
POST http://localhost:4545/api/reading
Content-Type: application/json

{
  "question": "What is my path"
}
```

Response structure:
```json
{
  "question": "What is my path",
  "number": 15,
  "details": { /* hexagram data */ },
  "hasChanging": true,
  "changingLineDetails": [
    { "line": 2, "text": "...", "comments": "..." },
    { "line": 5, "text": "...", "comments": "..." }
  ],
  "transformedNumber": 32,
  "transformedDetails": { /* hexagram data */ }
}
```
`details` and `transformedDetails` contain full hexagram records from the dataset.

### `GET /api/hexagram/[id]`
Retrieve the record for a specific hexagram (1–64).

**Example**
```http
GET http://localhost:4545/api/hexagram/1
```

Example response excerpt:
```json
{
  "hex": 1,
  "hex_font": "\u4DC0",
  "trad_chinese": "\u4E7E",
  "pinyin": "qián",
  ...
}
```
If the `id` is invalid, the endpoint returns `404` with `{ "error": "Hexagram not found" }`.

All endpoints respond with JSON and are intended for embedding Oraculo in larger applications.
