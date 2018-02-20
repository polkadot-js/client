// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { RuntimeInterface } from '@polkadot/client-wasm-runtime/types';

type FnResult = {
  lo: number,
  hi: number
};
type FnType = (...data: Array<Uint8Array>) => FnResult;

const u8aToHex = require('@polkadot/util/u8a/toHex');

module.exports = function createFn (fns: WebAssemblyInstance$Exports, name: string, { environment: { l, heap } }: RuntimeInterface): FnType {
  return (...data: Array<Uint8Array>): FnResult => {
    const params = data.reduce((params, data) => {
      l.debug('storing data', u8aToHex(data));

      params.push(heap.set(heap.allocate(data.length), data));
      params.push(data.length);

      return params;
    }, []);

    l.debug('executing', name, params);

    const lo: number = fns[name].apply(null, params);
    const hi: number = fns['get_result_hi']();

    return { lo, hi };
  };
};
