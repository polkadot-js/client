// ISC, Copyright 2017-2018 Jaco Greeff
// @flow

const io = require('./io');
const memory = require('./memory');
const runtime = require('./runtime');

// flowlint-next-line unclear-type:off
module.exports = function (wasmMemory: WebAssembly.Memory): { [string]: Function } {
  const rt = runtime(wasmMemory);
  const exports = Object.assign(
    {}, io(rt), memory(rt)
  );

  return Object
    .keys(exports)
    .reduce((result, key) => {
      result[`ext_${key}`] = exports[key];

      return result;
    }, {});
};
