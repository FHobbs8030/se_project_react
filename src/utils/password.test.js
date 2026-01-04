import { checkNumber, checkSymbol, checkPass } from './password';

test('checkNumber detects digits', () => {
  expect(checkNumber('abc')).toBe(false);
  expect(checkNumber('abc123')).toBe(true);
});

test('checkSymbol detects special characters', () => {
  expect(checkSymbol('abc')).toBe(false);
  expect(checkSymbol('abc_')).toBe(true);
});

test('checkPass validates full password', () => {
  expect(checkPass('abc$')).toBe(false);
  expect(checkPass('abc_123')).toBe(true);
});
