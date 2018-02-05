// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { RuntimeEnv$Storage } from '../types';

const u8aToHex = require('@polkadot/util/u8a/toHex');

module.exports = function set (storage: RuntimeEnv$Storage, key: Uint8Array, data: Uint8Array): void {
  storage.set(
    u8aToHex(key),
    data
  );
};
