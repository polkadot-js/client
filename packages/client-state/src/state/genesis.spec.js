// ISC, Copyright 2017 Jaco Greeff

const Genesis = require('./genesis');

describe('Genesis', () => {
  it('assigns sane defaults', () => {
    expect(
      new Genesis({})
    ).toEqual({
      hash: '0x00'
    });
  });

  it('assigns supplied values', () => {
    expect(
      new Genesis({ hash: '0x1234' })
    ).toEqual({
      hash: '0x1234'
    });
  });
});
