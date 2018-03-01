// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { RuntimeInterface } from '@polkadot/client-runtime/types';

const call = require('./call');

module.exports = function executeBlock (createInstance: () => WebAssemblyInstance$Exports, runtime: RuntimeInterface, block: Uint8Array): boolean {
  const result = call(createInstance(), runtime, 'execute_block')(block);

  return result.lo === 1;
};
