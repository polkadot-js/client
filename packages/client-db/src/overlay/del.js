// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BaseDbInterface } from '../types';
import type { Memory$Storage } from '../memory/types';

const u8aToHex = require('@polkadot/util/u8a/toHex');

module.exports = function del (pending: Memory$Storage, backend: BaseDbInterface, key: Uint8Array): void {
  pending[u8aToHex(key)] = {
    key,
    value: new Uint8Array([])
  };
};
