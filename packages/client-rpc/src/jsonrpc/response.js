// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { JsonRpcResponse } from '../types';

module.exports = function createResponse (id: number, result: any): JsonRpcResponse {
  return {
    id,
    jsonrpc: '2.0',
    result
  };
};
