// Map trigram keys to Ifá simple odu names and their 4-line bit patterns
export const trigramToIfa = {
  qian: { name: 'Ogbe',    pattern: [2,2,2,2] }, // ☰ → Ogbe (1111)
  dui:  { name: 'Osa',     pattern: [2,1,1,2] }, // ☱ → Osa  (1101)
  li:   { name: 'Obara',   pattern: [1,2,1,1] }, // ☲ → Obara(1011)
  zhen: { name: 'Irosun',  pattern: [1,0,0,1] }, // ☳ → Irosun(1001)
  xun:  { name: 'Iwori',   pattern: [0,1,1,1] }, //☴ → Iwori(0111)
  kan:  { name: 'Owonrin', pattern: [0,1,0,1] }, //☵ → Owonrin(0101)
  gen:  { name: 'Idi',     pattern: [0,0,1,1] }, //☶ → Idi   (0011)
  kun:  { name: 'Oyeku',   pattern: [0,0,0,1] }  //☷ → Oyeku (0001)
} as const;

export type TrigramKey = keyof typeof trigramToIfa;
export type IfaOdu = typeof trigramToIfa[TrigramKey];
