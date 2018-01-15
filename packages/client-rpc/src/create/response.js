// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { JsonRpcResponse } from '../types';

const createJson = require('./json');

module.exports = function createResponse (id: number, result: mixed): JsonRpcResponse {
  return createJson(id, ({
    result
  }: $Shape<JsonRpcResponse>));
};
