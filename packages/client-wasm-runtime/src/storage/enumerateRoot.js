// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { RuntimeEnv$Storage } from '../types';

module.exports = function enumerateRoot (storage: RuntimeEnv$Storage, values: Array<Uint8Array>, lens: Uint8Array): Uint8Array {
  console.error('@polkadot/wasm-runtime: enumerated_trie_root not implemented', values, lens);

  return new Uint8Array([]);
};
