// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const u8aConcat = require('@polkadot/util/u8a/concat');
const xxhash = require('@polkadot/util-crypto/xxhash/asU8a128');

const EMPTY_KEY = new Uint8Array([]);

module.exports = function key (prefix: Uint8Array, key?: ?Uint8Array, isHashed: boolean = true): Uint8Array {
  const prefixedKey = u8aConcat([ prefix, key || EMPTY_KEY ]);

  return isHashed
    ? xxhash(prefixedKey)
    : prefixedKey;
};
