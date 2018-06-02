// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ExecutorState } from '../types';

type CallResult = {
  lo: number,
  hi: number
};

type Call = (...data: Array<Uint8Array>) => CallResult;

const hexToU8a = require('@polkadot/util/hex/toU8a');
const u8aToHex = require('@polkadot/util/u8a/toHex');

const createWasm = require('../wasm');
const proxy = require('../wasm/proxy_substrate.wasm.js');

// NOTE testing only, comparing results
// const code = require('../wasm/polkadot_runtime.compact.wasm.js');

// FIXME We probably want to hash, but _should_ be pretty "safe"
const CODE_KEY = hexToU8a('0x3a636f6465');

module.exports = function call ({ config, l, runtime, stateDb: { db } }: ExecutorState, name: string): Call {
  const code = db.get(CODE_KEY);
  const instance = createWasm(config, runtime, code, proxy);
  const { heap } = runtime.environment;

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
