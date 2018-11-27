// Copyright 2017-2018 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { logger } from '@polkadot/util';

import index from './index';
import Heap from '../environment/heap';

const l = logger('test');

describe('memset', () => {
  let runtime;
  let memset;

  beforeEach(() => {
    runtime = {
      l,
      heap: new Heap()
    };
    runtime.heap.setWasmMemory({ buffer: new Uint8Array(5) });
    memset = index(runtime).memset;
  });

  it('sets the buffer to the correct values', () => {
    memset(0, 2, 3);

    expect(
      runtime.heap.get(0, 5).toString()
    ).toEqual('2,2,2,0,0');
  });
});
