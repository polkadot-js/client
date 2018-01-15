// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const DEFAULT_TABLE: WebAssemblyTable$Config = {
  initial: 0,
  element: 'anyfunc'
};

module.exports = function createTable (): WebAssembly.Table {
  return new WebAssembly.Table(DEFAULT_TABLE);
};
