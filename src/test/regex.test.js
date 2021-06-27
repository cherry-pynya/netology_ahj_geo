import validate from '../js/validate';

const values = [['1', '51.50851, -0.12572', true], ['2', '51.50851,-0.12572', true], ['3', '51', false], ['4', 'puck', false]];
// скобки вставляются в коде приложения
describe('testing', () => {
  test.each(values)('if %s is true?', (_, value, expected) => {
    const result = validate(value);
    expect(result).toBe(expected);
  });
});
