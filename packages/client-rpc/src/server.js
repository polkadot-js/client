// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { HandlersType, JsonRpcError, JsonRpcRequest, JsonRpcResponse, RpcConfigType } from './types';

type PostContextType = {
  body: JsonRpcError | JsonRpcResponse,
  request: {
    body: JsonRpcRequest
  }
};

const Koa = require('koa');
const koaBody = require('koa-body');
const koaJson = require('koa-json');
const KoaRouter = require('koa-router');

const ExtError = require('@polkadot/util/ext/error');
const l = require('@polkadot/util/logger')('rpc');
const isError = require('@polkadot/util/is/error');
const isFunction = require('@polkadot/util/is/function');
const isNumber = require('@polkadot/util/is/number');
const isUndefined = require('@polkadot/util/is/undefined');

const defaults = require('./defaults');
const { createError, createResponse } = require('./jsonrpc');

module.exports = class RPCServer {
  _handlers: HandlersType;
  _path: string;
  _port: number;
  _server: ?net$Server;

  constructor ({ path = defaults.PATH, port = defaults.PORT }: RpcConfigType, handlers: HandlersType, autoStart: boolean = true) {
    if (!isNumber(port)) {
      throw new Error(`Cannot instantiate with non-numeric port='${port}'`);
    }

    const handlerKeys = Object.keys(handlers || {});

    if (handlerKeys.length === 0) {
      throw new Error(`Cannot instantiate without handlers`);
    }

    const invalidHandlers = handlerKeys
      .filter((key) => !isFunction(handlers[key]))
      .map((key) => `'${key}'`);

    if (invalidHandlers.length) {
      throw new Error(`Invalid method handlers found: ${invalidHandlers.join(', ')}`);
    }

    this._handlers = handlers;
    this._path = path;
    this._port = port;
    this._server = null;

    if (autoStart) {
      this.start();
    }
  }

  stop () {
    if (this._server) {
      this._server.close();
      this._server = null;
    }
  }

  start () {
    this.stop();

    const router = new KoaRouter();

    router
      .use(this._path, koaBody())
      .use(this._path, koaJson({ pretty: false }))
      .post(this._path, this._handlePost);

    const app = new Koa();

    app.use(router.routes());

    this._server = app.listen(this._port);

    l.log(`Client started on port=${this._port}`);
  }

  _handlePost = async (ctx: PostContextType): Promise<void> => {
    const { request: { body: { id, jsonrpc, method, params } } } = ctx;

    try {
      if (jsonrpc !== '2.0') {
        throw new ExtError(`Invalid jsonrpc field, expected '2.0', got '${jsonrpc}'`, ExtError.CODES.INVALID_JSONRPC);
      }

      if (isUndefined(id) || !isNumber(id)) {
        throw new ExtError(`Expected a numeric id, got '${id}'`, ExtError.CODES.INVALID_JSONRPC);
      }

      const handler = this._handlers[method];

      if (!isFunction(handler)) {
        throw new ExtError(`Method '${method}' not found`, ExtError.CODES.METHOD_NOT_FOUND);
      }

      const result = await handler(params);

      if (isError(result)) {
        throw result;
      }

      ctx.body = createResponse(id, result);
    } catch (error) {
      ctx.body = createError(id, error);
    }
  }
};
