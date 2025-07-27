/**
 * Render a single 4-line pattern to text rows of ◯ and ┃
 * @param {readonly number[]} pattern - array of 4 values (0, 1, or 2)
 * @returns {string} multiline string
 */
export function renderIfaPattern(pattern: readonly number[]): string {
  return pattern.map(n => {
    if (n === 1) return '┃';  // Single line
    return '◯';               // Double line (for 0 and 2)
  }).join('\n');
}
