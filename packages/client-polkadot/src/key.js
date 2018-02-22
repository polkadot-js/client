// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const u8aConcat = require('@polkadot/util/u8a/concat');
const xxhash = require('@polkadot/util-crypto/xxhash/asU8a128');

const EMPTY_KEY = new Uint8Array([]);

// const { u8aToUtf8, u8aToHex } = require('@polkadot/util');

module.exports = function key (prefix: Uint8Array, key?: Uint8Array = EMPTY_KEY): Uint8Array {
  // console.log('key', u8aToUtf8(prefix), u8aToHex(key), xxhash(u8aConcat([ prefix, key ])));

  return xxhash(
    u8aConcat([ prefix, key ])
  );
};
