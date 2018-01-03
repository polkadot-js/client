// ISC, Copyright 2017-2018 Jaco Greeff

const rlpDecode = require('./decode');

describe('rlpDecode', () => {
  it('decodes, returning the message', () => {
    expect(
      rlpDecode(
        Buffer.from('cb00c900c100000000000000', 'hex')
      )
    ).toBeDefined();
  });
});
