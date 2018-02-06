// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { RuntimeEnv$Storage } from '../types';

module.exports = function set (storage: RuntimeEnv$Storage, key: Uint8Array, data: Uint8Array): void {
  storage.set(key, data);
};
