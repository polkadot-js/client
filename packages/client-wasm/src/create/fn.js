// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { RuntimeInterface } from '@polkadot/client-wasm-runtime/types';

const u8aToHex = require('@polkadot/util/u8a/toHex');

const FnType = (...data: Array<Uint8Array>) => Uint8Array;

module.exports = function createFn ({ exports }: WebAssemblyInstance, name: string, { environment: { l, heap } }: RuntimeInterface): FnType {
  return (...data: Array<Uint8Array>): Uint8Array => {
    const params = data.reduce((params, data) => {
      l.debug('storing data', u8aToHex(data));

      params.push(heap.set(heap.allocate(data.length), data));
      params.push(data.length);

      return params;
    }, []);

    l.debug('executing', name, params);

    return exports[name].apply(exports, params);
  };
};
