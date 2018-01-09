// ISC, Copyright 2017-2018 Jaco Greeff
// @flow

import type { Logger } from '@polkadot/util/types';
import type { RuntimeEnv$Heap, PointerType } from '../types';

const utf8Coder = new TextDecoder('utf-8');

module.exports = function print (l: Logger, heap: RuntimeEnv$Heap, ptr: PointerType, len: number): void {
  l.log(
    utf8Coder.decode(
      heap.get(ptr, len)
    )
  );
};
