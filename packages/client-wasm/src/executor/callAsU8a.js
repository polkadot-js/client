// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ExecutorState } from '../types';

export type CallU8a = (...data: Array<Uint8Array>) => Uint8Array;

const u8aToHex = require('@polkadot/util/u8a/toHex');

const call = require('./call');

module.exports = function callAsU8a (self: ExecutorState, name: string): CallU8a {
  const fn = call(self, name);
  const { l, heap } = self.runtime.environment;

  return (...data: Array<Uint8Array>): Uint8Array => {
    const { hi, lo } = fn.apply(null, data);
    const result = heap.get(lo, hi).slice();

    l.debug(() => ['received', u8aToHex(result)]);

    return result;
  };
};
