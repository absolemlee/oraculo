// Returns data for a specific hexagram number.
// Access via `/api/hexagram/23` to retrieve hexagram 23 details.

import ichingData from '../../../resources/iching/data/iching.js';

export default function handler(req, res) {
  const { id } = req.query;
  const data = ichingData[id];
  if (!data) {
    res.status(404).json({ error: 'Hexagram not found' });
  } else {
    res.status(200).json(data);
  }
}
