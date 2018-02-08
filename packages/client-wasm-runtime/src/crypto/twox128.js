// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const xxhashAsU8A128 = require('@polkadot/util-crypto/xxhash/asU8A128');

module.exports = function twox128 (data: Uint8Array): Uint8Array {
  return xxhashAsU8A128(data);
};
