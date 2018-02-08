// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BaseDbInterface } from '@polkadot/client-db/types';
import type { Memory$Storage } from '@polkadot/client-db/memory/types';

const u8aToHex = require('@polkadot/util/u8a/toHex');

module.exports = function set (pending: Memory$Storage, backend: BaseDbInterface, k: Uint8Array, v: Uint8Array): void {
  pending[u8aToHex(k)] = {
    k,
    v
  };
};
