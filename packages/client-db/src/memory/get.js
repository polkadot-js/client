// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Memory$Storage } from './types';

const u8aToString = require('@polkadot/util/u8a/toString');

module.exports = function get (storage: Memory$Storage, k: Uint8Array): Uint8Array {
  const ks = u8aToString(k);

  return storage[ks]
    ? storage[ks].v.slice()
    : new Uint8Array([]);
};
