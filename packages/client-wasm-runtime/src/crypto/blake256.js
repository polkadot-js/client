// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const blake2AsU8a256 = require('@polkadot/util-crypto/blake2/asU8a256');

module.exports = function blake256 (data: Uint8Array): Uint8Array {
  return blake2AsU8a256(data);
};
