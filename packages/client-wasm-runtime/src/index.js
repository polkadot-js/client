// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { RuntimeInterface } from './types';

const memory = require('./memory');
const runtime = require('./runtime');

module.exports = function (wasmMemory: WebAssembly.Memory): any {
  const rt = runtime(wasmMemory);
  const exports: RuntimeInterface = Object.assign(
    ({}: $Shape<RuntimeInterface>), memory(rt)
  );

  return Object
    .keys(exports)
    .reduce((result, key) => {
      result[`ext_${key}`] = exports[key];

      return result;
    }, {});
};
