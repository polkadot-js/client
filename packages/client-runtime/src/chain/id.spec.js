// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
/* eslint camelcase: 0 */

const BN = require('bn.js');

const index = require('./index');

describe('chain_id', () => {
  let chain_id;

  beforeEach(() => {
    chain_id = index({
      l: {
        debug: () => void 0
      },
      chain: {
        params: {
          networkId: new BN(1337)
        }
      }
    }).chain_id;
  });

  it('exposes the correct networkId', () => {
    expect(
      chain_id()
    ).toEqual(1337);
  });
});
