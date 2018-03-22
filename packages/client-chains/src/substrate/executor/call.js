// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ChainState } from '../../types';

type CallResult = {
  lo: number,
  hi: number
};

type Call = (...data: Array<Uint8Array>) => CallResult;

const createWasm = require('@polkadot/client-wasm');
const u8aToHex = require('@polkadot/util/u8a/toHex');

const proxy = require('../../wasm/proxy_substrate_wasm');

module.exports = function call ({ chain: { code, genesis }, config, runtime }: ChainState, name: string): Call {
  const instance = createWasm(config, runtime, code || genesis.code, proxy);
  const { l, heap } = runtime.environment;

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

    return {
      lo: 0,
      hi: 0
    };
  };
};
