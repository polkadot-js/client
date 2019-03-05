// Copyright 2017-2019 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { RuntimeEnv, RuntimeInterface$Io, Pointer } from '../types';

import instrument from '../instrument';
import printHex from './printHex';
import printUtf8 from './printUtf8';
import printNum from './printNum';

export default function io ({ heap, l }: RuntimeEnv): RuntimeInterface$Io {
  return {
    print_hex: (ptr: Pointer, len: number): void =>
      instrument('print_hex', (): void => {
        l.debug(() => ['print_hex', [ptr, len]]);

        printHex(l, heap.get(ptr, len));
      }),
    print_num: (hi: number, lo: number): void =>
      instrument('print_num', (): void => {
        l.debug(() => ['print_num', [hi, lo]]);

        printNum(l, hi, lo);
      }),
    print_utf8: (ptr: Pointer, len: number): void =>
      instrument('print_utf8', (): void => {
        l.debug(() => ['print_utf8', [ptr, len]]);

        printUtf8(l, heap.get(ptr, len));
      })
  };
}
