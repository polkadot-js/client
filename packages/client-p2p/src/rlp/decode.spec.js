// ISC, Copyright 2017 Jaco Greeff

const rlpDecode = require('./decode');

describe('rlpDecode', () => {
  it('expects an input Buffer', () => {
    expect(
      () => rlpDecode()
    ).toThrow(/message buffer/);
  });

  it('decodes, returning the message', () => {
    expect(
      rlpDecode(
        Buffer.from('cb00c900c100000000000000', 'hex')
      )
    ).toBeDefined();
  });
});
