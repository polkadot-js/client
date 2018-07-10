// Copyright 2017-2018 @polkadot/client-wasm authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { ExecutorState } from '../types';
import { CallResult } from './types';

import storage from '@polkadot/storage';
import key from '@polkadot/storage/key';
import assert from '@polkadot/util/assert';
import u8aToHex from '@polkadot/util/u8a/toHex';

import createWasm from '../create';
import proxy from '../wasm/proxy_substrate_wasm';

// NOTE testing only, comparing results
// import code from '../wasm/polkadot_runtime_compact_wasm';

type Call = (...data: Array<Uint8Array>) => CallResult;

const CODE_KEY = key(storage.consensus.public.code)();

export default function call ({ config, l, runtime, stateDb }: ExecutorState, name: string): Call {
  const code = stateDb.db.get(CODE_KEY);

  assert(code, 'Expected to have code available in runtime');

  // @ts-ignore code check above
  const instance = createWasm({ config, l }, runtime, code, proxy);
  const { heap } = runtime.environment;

  return (...data: Array<Uint8Array>): CallResult => {
    const start = Date.now();

    l.debug(() => ['preparing', name]);
    // runtime.instrument.start();

    const params = data.reduce((params, data) => {
      l.debug(() => ['storing', u8aToHex(data)]);

      params.push(heap.set(heap.allocate(data.length), data));
      params.push(data.length);

      return params;
    }, ([] as number[]));

    l.debug(() => ['executing', name, params]);

    const lo: number = instance[name].apply(null, params);
    const hi: number = instance['get_result_hi']();

    // l.debug(() => runtime.instrument.stop());
    l.debug(() => [name, 'returned', [lo, hi], `(${Date.now() - start}ms)`]);

    return {
      bool: hi === 0 && lo === 1,
      hi,
      lo
    };
  };
}
