// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { JsonRpcError, JsonRpcRequest, JsonRpcResponse } from '../types';
import type { RpcState } from './types';

const assert = require('@polkadot/util/assert');
const ExtError = require('@polkadot/util/ext/error');
const isError = require('@polkadot/util/is/error');
const isFunction = require('@polkadot/util/is/function');

const { createError, createResponse } = require('../create');
const validateRequest = require('../validate/request');

module.exports = async function handleMessage (self: RpcState, message: string): Promise<JsonRpcError | JsonRpcResponse> {
  try {
    const { id, jsonrpc, method, params }: JsonRpcRequest = JSON.parse(message);

    try {
      validateRequest(id, jsonrpc);

      const handler = self.handlers[method];

      assert(isFunction(handler), `Method '${method}' not found`, ExtError.CODES.METHOD_NOT_FOUND);

      const result = await handler(params);

      if (isError(result)) {
        throw result;
      }

      return createResponse(id, result);
    } catch (error) {
      return createError(id, error);
    }
  } catch (error) {
    return createError(0, error);
  }
};
