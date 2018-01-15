// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

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
