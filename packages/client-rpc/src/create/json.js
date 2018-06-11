// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

module.exports = function createJson<T> (id?: number, body: $Shape<T>): T {
  return Object.assign({
    id,
    jsonrpc: '2.0'
  }, body);
};
