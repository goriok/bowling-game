let score = require('./bowling');

describe('to play a bowling game', () => {
  const strike = [10];
  const spare = [7, 3];
  const roll = (times, pins) => {
    if (times > 1) {
      return [pins].concat(roll(times - 1, pins));
    } else {
      return [pins];
    }
  };

  test('gutter game', () => {
    expect(score(roll(20, 0))).toBe(0);
  });

  test('all ones game', () => {
    expect(score(roll(20, 1))).toBe(20);
  });

  test('one spare', () => {
    const rolls = spare.concat(
      roll(1, 3),
      roll(17, 0));

    expect(score(rolls)).toBe(16);
  });

  test('one strike', () => {
    const rolls = strike.concat(
      roll(1, 3),
      roll(1, 3),
      roll(16, 0));

    expect(score(rolls)).toBe(22);
  });

  test('perfect game', () => {
    const rolls = roll(12, ...strike);
    expect(score(rolls)).toBe(300);
  });

  test('half perfect game', () => {
    const rolls = roll(21, 5);
    expect(score(rolls)).toBe(150);
  });

  test('partial score', () => {
    expect(score([1, 3, 5, 5, 10, 2, 2, 1])).toBe(43);
  });
});