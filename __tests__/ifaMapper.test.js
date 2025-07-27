import { mapHexagramToIfaPair } from '../src/utils/ifaMapper';

test('Static hexagram repeats primary', () => {
  const cells = Array(6).fill({value:1,moving:false});
  const res = mapHexagramToIfaPair(cells);
  expect(res.primary.name).toBe('Ogbe + Ogbe');
  expect(res.secondary.name).toBe(res.primary.name);
});

test('Moving hexagram transforms', () => {
  const cells = [
    {value:1,moving:true}, {value:1,moving:false}, {value:1,moving:false},
    {value:0,moving:false}, {value:0,moving:false}, {value:1,moving:true}
  ];
  const res = mapHexagramToIfaPair(cells);
  expect(res.primary.name).toBe('Ogbe + Oyeku');
  expect(res.secondary.name).toBe('Iwori + Idi');
});
