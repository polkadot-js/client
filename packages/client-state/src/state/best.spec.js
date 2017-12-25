// ISC, Copyright 2017 Jaco Greeff

const BN = require('bn.js');

const Best = require('./best');

describe('Best', () => {
  it('assigns sane defaults', () => {
    expect(
      new Best()
    ).toEqual({
      hash: '0x00',
      number: new BN(0)
    });
  });

  it('assigns supplied values', () => {
    expect(
      new Best('0x1234', new BN(0x1234))
    ).toEqual({
      hash: '0x1234',
      number: new BN(0x1234)
    });
  });
});
