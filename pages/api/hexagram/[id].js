// Returns data for a specific hexagram number.
// Access via `/api/hexagram/23` to retrieve hexagram 23 details.

import ichingData from '../../../resources/iching/data/iching.js';
import { setCors } from '../../../lib/cors.js';

export default function handler(req, res) {
  setCors(res);

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { id } = req.query;
  const numericId = parseInt(id, 10);
  if (isNaN(numericId)) {
    res.status(400).json({ error: 'Invalid hexagram ID' });
    return;
  }
  const data = ichingData[numericId];
  if (!data) {
    res.status(404).json({ error: 'Hexagram not found' });
  } else {
    res.status(200).json(data);
  }
}
