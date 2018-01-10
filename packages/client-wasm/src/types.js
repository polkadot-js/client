// ISC, Copyright 2017-2018 Jaco Greeff
// @flow

export type WasmExports = {
  // flowlint-next-line unclear-type:off
  env: Object
};

export type WasmConfigType = {
  memoryInitial: number,
  memoryMaximum: number
};

// flowlint-next-line unclear-type:off
export type WasmExtraImports = Object;
