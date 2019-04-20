let score = require('./bowling');

function roll(times, pins) {
  times--;
  if (times > 0) {
    return [pins].concat(roll(times, pins));
  } else {
    return [pins];
  }
}

function spare() {
  return [5, 5];
}

function stryke() {
  return [10];
}

describe('to play a bowling game', () => {
  it('gutter game', () => {
    expect(score(roll(20, 0))).toBe(0);
  });

  it('all ones game', () => {
    expect(score(roll(20, 1))).toBe(20);
  });

  it('one spare', () => {
    const rolls = spare()
      .concat(
        roll(1, 3),
        roll(17, 0));

    expect(score(rolls)).toBe(16);
  });

  it('one stryke', () => {
    const rolls = stryke()
      .concat(
        roll(1, 3),
        roll(1, 3),
        roll(16, 0));

    expect(score(rolls)).toBe(22);
  });

  it('perfect game', () => {
    const rolls = roll(12, 10);
    expect(score(rolls)).toBe(300);
  });

  it('half perfect game', () => {
    const rolls = roll(21, 5);
    expect(score(rolls)).toBe(150);
  });


});
