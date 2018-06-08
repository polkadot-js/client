// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ExecutorState } from '../types';
import type { CallResult } from './types';

type Call = (...data: Array<Uint8Array>) => CallResult;

const storage = require('@polkadot/storage');
const key = require('@polkadot/storage/key');
const u8aToHex = require('@polkadot/util/u8a/toHex');

const createWasm = require('../create');
const proxy = require('../wasm/proxy_substrate.wasm.js');

// NOTE testing only, comparing results
// const code = require('../wasm/polkadot_runtime.compact.wasm.js');

const CODE_KEY = key(storage.consensus.public.code)();

module.exports = function call ({ config, genesis, l, runtime, stateDb }: ExecutorState, name: string): Call {
  const code = stateDb.db.get(CODE_KEY) || genesis.code;
  const instance = createWasm({ config, l }, runtime, code, proxy);
  const { heap } = runtime.environment;

  return (...data: Array<Uint8Array>): CallResult => {
    const start = Date.now();

    l.debug(() => ['preparing', name]);

    runtime.instrument.start();

    const params = data.reduce((params, data) => {
      l.debug(() => ['storing', u8aToHex(data)]);

      params.push(heap.set(heap.allocate(data.length), data));
      params.push(data.length);

      return params;
    }, []);

    l.debug(() => ['executing', name, params]);

    const lo: number = instance[name].apply(null, params);
    const hi: number = instance['get_result_hi']();

    l.debug(() => runtime.instrument.stop());
    l.debug(() => [name, 'returned', [lo, hi], `(${Date.now() - start}ms)`]);

    return {
      bool: hi === 0 && lo === 1,
      hi,
      lo
    };
  };
};
