// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { RuntimeEnv, RuntimeInterface$Io, PointerType } from '../types';

const printHex = require('./printHex');
const printUtf8 = require('./printUtf8');
const printNum = require('./printNum');

module.exports = function io ({ heap, l }: RuntimeEnv): RuntimeInterface$Io {
  return {
    print_hex: (ptr: PointerType, len: number): void => {
      l.debug('print_hex', [ptr, len]);

      printHex(l, heap.get(ptr, len));
    },
    print_utf8: (ptr: PointerType, len: number): void => {
      l.debug('print_utf8', [ptr, len]);

      printUtf8(l, heap.get(ptr, len));
    },
    print_num: (hi: number, lo: number): void => {
      l.debug('print_num', [hi, lo]);

      printNum(l, hi, lo);
    }
  };
};
