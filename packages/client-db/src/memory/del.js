// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Memory$Storage } from './types';

const u8aToString = require('@polkadot/util/u8a/toString');

module.exports = function del (storage: Memory$Storage, k: Uint8Array): void {
  const ks = u8aToString(k);

  if (storage[ks]) {
    delete storage[ks];
  }
};
