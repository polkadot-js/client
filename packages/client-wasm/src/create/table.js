// ISC, Copyright 2017 Jaco Greeff
// @flow

const DEFAULT_TABLE: WebAssemblyTable$Config = {
  initial: 0,
  element: 'anyfunc'
};

module.exports = function createTable (): WebAssembly.Table {
  return new WebAssembly.Table(DEFAULT_TABLE);
};
