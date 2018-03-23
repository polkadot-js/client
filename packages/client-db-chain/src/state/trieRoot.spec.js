// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const u8aFromString = require('@polkadot/util/u8a/fromString');
const hexToU8a = require('@polkadot/util/hex/toU8a');

const createStateDb = require('./index');

describe('trieRoot', () => {
  let state;

  beforeEach(() => {
    state = createStateDb({
      pairs: () => [
        { k: u8aFromString('A'), v: u8aFromString('aaaa') },
        { k: u8aFromString('B'), v: u8aFromString('bbbb') }
      ]
    });
  });

  it('encodes two simple k/v pairs', () => {
    expect(
      state.trieRoot()
    ).toEqual(
      hexToU8a(
        '0x59262fe132edbc936eeeec3450ab442c81dcbc6168fb558c61e7a8cc883108e3'
      )
    );
  });
});
