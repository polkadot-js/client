// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const hexToU8a = require('@polkadot/util/hex/toU8a');
const xxhashAsHex256 = require('@polkadot/util-crypto/xxhash/asHex256');

module.exports = function twox256 (data: Uint8Array): Uint8Array {
  return hexToU8a(
    xxhashAsHex256(data)
  );
};
