// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const xxhashAsU8a256 = require('@polkadot/util-crypto/xxhash/asU8a256');

module.exports = function twox256 (data: Uint8Array): Uint8Array {
  return xxhashAsU8a256(data);
};
