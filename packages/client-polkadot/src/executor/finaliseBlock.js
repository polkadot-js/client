// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { RuntimeInterface } from '@polkadot/client-runtime/types';

const callAsU8a = require('./callAsU8a');

module.exports = function finaliseBlock (createInstance: () => WebAssemblyInstance$Exports, runtime: RuntimeInterface, header: Uint8Array): Uint8Array {
  return callAsU8a(createInstance(), runtime, 'finalise_block')(header);
};
