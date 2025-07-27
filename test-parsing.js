// Test the parsing functions
console.log('=== Testing Ifá parsing functions ===');

// Simulate the parsing functions from index.tsx
const parseIfaNames = (combinedName) => {
  const parts = combinedName.split(' + ');
  return {
    lower: parts[0] || parts[1], // First part is lower trigram (cast first)
    upper: parts[1] || parts[0]  // Second part is upper trigram
  };
};

const parseIfaGlyph = (glyph) => {
  const parts = glyph.split('\n---\n');
  return {
    lower: parts[0] || parts[1], // First part is lower trigram (cast first)
    upper: parts[1] || parts[0]  // Second part is upper trigram
  };
};

// Test with sample data
const sampleName = "Ogbe + Irosun";
const sampleGlyph = `┃
┃
┃
┃
---
◯
┃
◯
◯`;

console.log('Sample name:', sampleName);
console.log('Parsed names:', parseIfaNames(sampleName));

console.log('\nSample glyph:', sampleGlyph);
console.log('Parsed glyphs:', parseIfaGlyph(sampleGlyph));

console.log('\n=== This should show ===');
console.log('Left side (lower trigram): Ogbe with pattern:');
console.log(`┃
┃
┃
┃`);
console.log('\nRight side (upper trigram): Irosun with pattern:');
console.log(`◯
┃
◯
◯`);
