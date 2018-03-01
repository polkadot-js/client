// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { RuntimeInterface } from '@polkadot/client-runtime/types';
import type { CallType, CallResult } from './types';

const u8aToHex = require('@polkadot/util/u8a/toHex');

module.exports = function call (instance: WebAssemblyInstance$Exports, { environment: { l, heap } }: RuntimeInterface, name: string): CallType {
  return (...data: Array<Uint8Array>): CallResult => {
    l.debug(() => ['preparing', name]);

    const params = data.reduce((params, data) => {
      l.debug(() => ['storing', u8aToHex(data)]);

      params.push(heap.set(heap.allocate(data.length), data));
      params.push(data.length);

      return params;
    }, []);

    l.debug(() => ['executing', name, params]);

    try {
      const lo: number = instance[name].apply(null, params);
      const hi: number = instance['get_result_hi']();

      l.debug(() => ['returned', [lo, hi]]);

      return { lo, hi };
    } catch (error) {
      l.error('execution error', error);
    }

    return { lo: 0, hi: 0 };
  };
};
