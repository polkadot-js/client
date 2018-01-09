// ISC, Copyright 2017-2018 Jaco Greeff
// @flow

import type { DbInterface } from '@polkadot/client-db/types';
import type { RuntimeEnv$Heap, PointerType } from '../types';

const u8aToBuffer = require('@polkadot/util/u8a/toBuffer');

module.exports = function set (heap: RuntimeEnv$Heap, storage: DbInterface, keyPtr: PointerType, keyLength: number, dataPtr: PointerType, dataLength: number): void {
  const key = u8aToBuffer(heap.get(keyPtr, keyLength));
  const data = u8aToBuffer(heap.get(dataPtr, dataLength));

  storage.put(key, data);
};
