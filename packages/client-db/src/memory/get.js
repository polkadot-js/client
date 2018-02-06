// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Memory$Storage } from './types';

const u8aToHex = require('@polkadot/util/u8a/toHex');

module.exports = function get (storage: Memory$Storage, k: Uint8Array): Uint8Array {
  return storage[u8aToHex(k)]
    ? storage[u8aToHex(k)].v
    : new Uint8Array([]);
};
