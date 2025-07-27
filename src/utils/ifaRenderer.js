/**
 * Render a single 4-line pattern to text rows of ◯ and ┃
 * @param {number[]} pattern - array of 4 values (1 or 2)
 * @returns {string} multiline string
 */
export function renderIfaPattern(pattern) {
  return pattern.map(n => n === 1 ? '┃' : '◯').join('\n');
}
