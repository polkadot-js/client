// ISC, Copyright 2017 Jaco Greeff

const { chains, validateChain } = require('./index');

describe('client-chains', () => {
  Object.values(chains).forEach((chain) => {
    it(`validates chain '${chain.name}' (strict)`, () => {
      expect(
        validateChain(chain, true)
      ).toBeDefined();
    });
  });
});
