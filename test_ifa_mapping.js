// Quick test to verify Ifá trigram mapping
const { mapHexagramToIfaPair } = require('./lib/ifaMapper.ts');
const { convertLinesToCells } = require('./lib/hexagramUtils.ts');

// Test Hexagram 1: ☰☰ (Qian above, Qian below)
// All Yang lines: [7,7,7,7,7,7]
const hexagram1Lines = [7,7,7,7,7,7];
const cells1 = convertLinesToCells(hexagram1Lines);
const ifa1 = mapHexagramToIfaPair(cells1);

console.log('Hexagram 1 (☰☰):');
console.log('Name:', ifa1.primary.name);
console.log('Expected: Ogbe + Ogbe (upper Qian + lower Qian)');
console.log('Glyph:');
console.log(ifa1.primary.glyph);
console.log();

// Test Hexagram 2: ☷☷ (Kun above, Kun below)  
// All Yin lines: [6,6,6,6,6,6]
const hexagram2Lines = [6,6,6,6,6,6];
const cells2 = convertLinesToCells(hexagram2Lines);
const ifa2 = mapHexagramToIfaPair(cells2);

console.log('Hexagram 2 (☷☷):');
console.log('Name:', ifa2.primary.name);
console.log('Expected: Oyeku + Oyeku (upper Kun + lower Kun)');
console.log('Glyph:');
console.log(ifa2.primary.glyph);
