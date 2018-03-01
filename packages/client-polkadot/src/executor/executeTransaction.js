// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { RuntimeInterface } from '@polkadot/client-runtime/types';

const u8aConcat = require('@polkadot/util/u8a/concat');

const callAsU8a = require('./callAsU8a');

module.exports = function executeTransaction (createInstance: () => WebAssemblyInstance$Exports, runtime: RuntimeInterface, header: Uint8Array, utx: Uint8Array): Uint8Array {
  return callAsU8a(createInstance(), runtime, 'execute_transaction')(
    u8aConcat([ header, utx ])
  );
};
