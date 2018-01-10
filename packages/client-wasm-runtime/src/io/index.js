// ISC, Copyright 2017-2018 Jaco Greeff
// @flow

import type { RuntimeEnv, RuntimeInterface$Io, PointerType } from '../types';

const print = require('./print');
const printNum = require('./printNum');

module.exports = function io ({ heap, l }: RuntimeEnv): RuntimeInterface$Io {
  return {
    print: (ptr: PointerType, len: number): void =>
      print(l, heap.get(ptr, len)),
    print_num: (num: number): void =>
      printNum(l, num)
  };
};
