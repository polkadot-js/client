// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { RuntimeEnv$Heap, PointerType } from '../types';

const u8aToHex = require('@polkadot/util/u8a/toHex');

module.exports = function memcpy (heap: RuntimeEnv$Heap, dstPtr: PointerType, srcPtr: PointerType, num: number): PointerType {
  console.log(u8aToHex(heap.get(srcPtr, num)));

  heap.set(
    dstPtr,
    heap.get(srcPtr, num)
  );

  return dstPtr;
};
