// ISC, Copyright 2017-2018 Jaco Greeff
// @flow

import type { JsonRpcResponse } from '../types';

const createJson = require('./json');

module.exports = function createResponse (id: number, result: any): JsonRpcResponse {
  return createJson(id, ({
    result
  }: $Shape<JsonRpcResponse>));
};
