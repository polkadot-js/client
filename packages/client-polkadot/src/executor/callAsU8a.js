// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { RuntimeInterface } from '@polkadot/client-runtime/types';
import type { CallU8aType } from './types';

const u8aToHex = require('@polkadot/util/u8a/toHex');
const call = require('./call');

module.exports = function callAsU8a (instance: WebAssemblyInstance$Exports, runtime: RuntimeInterface, name: string): CallU8aType {
  const fn = call(instance, runtime, name);

  return (...data: Array<Uint8Array>): Uint8Array => {
    const { hi, lo } = fn.apply(null, data);
    const result = runtime.environment.heap.get(lo, hi);

    runtime.environment.l.debug(() => ['received', u8aToHex(result)]);

    return result;
  };
};
