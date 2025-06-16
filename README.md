# oraculisimo
Oracle study -

This project now uses **Next.js** to render the oracle interface. Install dependencies with `npm install` and start the dev server using `npm run dev`.
This project is implemented entirely in JavaScript using React and Next.js; PHP is no longer required.

DB: sqlite3 database pointed to in `resources/iching/data/iching.db` initially base on Richard Wilhelm's translation, worked on and translated.

As of this commit and all until a version 1.0 is reached: This is an experimental correspondence between the architecture of the yiqing and of the sacred ifa, along with other geomantic references.

This project is meant to augment the reach of intertraditional oracular auscultations.

The limits imposed by his approach can be centered upon the 2^3 binary approach to geomantic systems, of the three included, only the ICHING adheres to this structure, however, the dynamic approach to the cast involves an expansive view of the interplay of possibilities and a full reading, spanning the static moment and the future tendencies, can be read. In both geomantic and IFA casting, a double sign must be cast. A comment must be made that the 2^4 aspect of casting present in both IFA and Geomancy provide a static body of 256 signs (one that still necesites dynamic distinction, usually present in the reader's body of knowledge).

In respect to maintaing the baggage of IFA and the mysteries of Geomancy in their place, without violating the strict ritualistic policies they are governed with, we are in essence, casting the oracle through the lens of the yiqing and corresponding the cast to the IFA and Geomantic equivalents. Priests and Oracles of their respective traditions will find this highly useful, especially those given to integration and acknowledging the universal spirit of humanity.

This is a work in progress and an open call to collaborators, especialy if you happen to be, like me, a technologically inclined, programming priest of the arcane path.

Looking forward to meeting you.

@absolemlee
lee@absolemly.com

---

## Repository Overview

This repository contains a lightweight Next.js application for generating I‑Ching (Yijing) oracle readings in the browser.

- **Client-side app with Next.js** – the main page is `pages/index.js`, which exports a React component for the oracle interface. Next.js configuration is minimal, enabling React strict mode in `next.config.js`.
- **Generating hexagrams** – constants model the four possible line types. `generateLine()` tosses three coins to decide one line, `generateHexagram()` repeats this six times, and helper functions convert line sequences to a hexagram index.
- **Handling a user question** – the `Home` component stores the user’s question and the reading result. On form submission it generates a hexagram, looks up descriptions in `resources/iching/data/iching.js`, and computes a transformed hexagram when changing lines appear.
- **Displaying the reading** – the UI shows the user’s question, hexagram number, glyph, and commentary. If changing lines exist, the future hexagram is also displayed. Styling is provided by `public/iching.css`.
- **Hexagram data** – `resources/iching/data/iching.js` is a large JSON object with translations and explanations. The same information is available in CSV and SQLite formats for reference.

## How it Works

1. Run `npm install` followed by `npm run dev` to start the development server.
2. Visit the app in your browser, enter a question, and submit the form.
3. The page generates a random hexagram, fetches the text from `resources/iching/data/iching.js`, and renders the reading with an optional transformed hexagram if changing lines are present.

