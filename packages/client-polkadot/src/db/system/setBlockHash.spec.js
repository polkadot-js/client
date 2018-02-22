// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const u8aToHex = require('@polkadot/util/u8a/toHex');

const index = require('../index');

describe('setBlockHash', () => {
  let system;

  beforeEach(() => {
    const store = {};

    system = index({
      get: (key) => store[u8aToHex(key)] || new Uint8Array([]),
      set: (key, value) => {
        store[u8aToHex(key)] = value;
      }
    }).system;
  });

  it('sets balances', () => {
    system.setBlockHash(5, new Uint8Array([123]));

    expect(
      system.getBlockHash(5)
    ).toEqual(new Uint8Array([123]));
  });
});
