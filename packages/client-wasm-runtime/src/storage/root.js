// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { RuntimeEnv$Storage } from '../types';

module.exports = function root (storage: RuntimeEnv$Storage): Uint8Array {
  console.error('@polkadot/wasm-runtime: storage_root not implemented');

  return new Uint8Array([]);
};
