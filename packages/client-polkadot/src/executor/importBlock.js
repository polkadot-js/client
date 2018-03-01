// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { RuntimeInterface } from '@polkadot/client-runtime/types';

const executeBlock = require('./executeBlock');

module.exports = function importBlock (createInstance: () => WebAssemblyInstance$Exports, runtime: RuntimeInterface, block: Uint8Array): boolean {
  const result = executeBlock(createInstance, runtime, block);

  if (result) {
    runtime.environment.db.commit();
  }

  return result;
};
