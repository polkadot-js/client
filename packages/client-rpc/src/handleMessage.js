// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { JsonRpcError, JsonRpcRequest, JsonRpcResponse, RpcState, WsContext$Socket } from './types';
const assert = require('@polkadot/util/assert');
const ExtError = require('@polkadot/util/ext/error');
const isError = require('@polkadot/util/is/error');
const isFunction = require('@polkadot/util/is/function');

const { createError, createResponse } = require('./create');
const validateRequest = require('./validate/request');

const SUBSCRIBE_REGEX = /^subscribe_/;

module.exports = async function handleMessage ({ handlers, l, subscribe }: RpcState, message: string, socket?: WsContext$Socket): Promise<JsonRpcError | JsonRpcResponse> {
  try {
    const { id, jsonrpc, method, params }: JsonRpcRequest = JSON.parse(message);
    const isSubscription = SUBSCRIBE_REGEX.test(method);

    if (isSubscription && socket === undefined) {
      throw new Error(`Subscription for '${method}' not available on RPC interface`);
    }

    try {
      validateRequest(id, jsonrpc);

      const handler = handlers[method];

      assert(isFunction(handler), `Method '${method}' not found`, ExtError.CODES.METHOD_NOT_FOUND);

      const result = isSubscription
        ? await subscribe(socket, handler, params)
        : await handler(params);

      l.debug(() => ['executed', method, params, '->', result]);

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
