// ISC, Copyright 2017-2018 Jaco Greeff
// @flow

import type { Logger } from '@polkadot/util/types';
import type { RuntimeType$Memory } from '../types';

const utf8Coder = new TextDecoder('utf-8');

module.exports = function print (l: Logger, heap: RuntimeType$Memory, ptr: PointerType, len: number): void {
  l.log(
    utf8Coder.decode(
      heap.uint8.subarray(ptr, ptr + len)
    )
  );
};
