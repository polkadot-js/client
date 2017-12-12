// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { JsonRpcBase } from '../types';

module.exports = function createJson (id: number, body: { [string]: any }): $Shape<JsonRpcBase> {
  return Object.assign({
    id,
    jsonrpc: '2.0'
  }, body);
};
