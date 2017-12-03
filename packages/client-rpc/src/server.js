// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { HandlersType, JsonRpcError, JsonRpcRequest, JsonRpcResponse, RpcConfigType, RpcType } from './types';

type PostContextType = {
  body: JsonRpcError | JsonRpcResponse,
  request: {
    body: JsonRpcRequest
  }
};

type WsContextType = {
  ws: WebSocket
};

const Koa = require('koa');
const koaBody = require('koa-body');
const koaJson = require('koa-json');
const koaRoute = require('koa-route');
const koaWebsocket = require('koa-websocket');

const assert = require('@polkadot/util/assert');
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
  _type: Array<RpcType>;

  constructor ({ path = defaults.PATH, port = defaults.PORT, type = defaults.TYPE }: RpcConfigType, handlers: HandlersType, autoStart: boolean = true) {
    RPCServer._validateConfig({ path, port, type });
    RPCServer._validateHandlers(handlers);

    this._handlers = handlers;
    this._path = path;
    this._port = port;
    this._server = null;
    this._type = type;

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

    const app = this._type.includes['ws']
      ? new Koa()
      : koaWebsocket(new Koa());

    if (this._type.includes('http')) {
      app.use(koaBody());
      app.use(koaJson({ pretty: false }));
      app.use(koaRoute.post(this._path, this._handlePost));
    }

    if (this._type.includes('ws')) {
      app.ws.use(koaRoute.all(this._path, this._handleWs));
    }

    this._server = app.listen(this._port);

    l.log(`Client started on port=${this._port}`);
  }

  _handlePost = async (ctx: PostContextType): Promise<void> => {
    const { request: { body } } = ctx;

    ctx.body = await this._handleMessage(body);
  }

  _handleWs = async (ctx: WsContextType): Promise<void> => {
    const { websocket } = ctx;

    websocket.on('message', async (message: string) => {
      const request: JsonRpcRequest = JSON.parse(message);
      const response = await this._handleMessage(request);

      websocket.send(
        JSON.stringify(response)
      );
    });
  }

  _handleMessage = async ({ id, jsonrpc, method, params }: JsonRpcRequest): Promise<JsonRpcError | JsonRpcResponse> => {
    try {
      RPCServer._validateRequest(id, jsonrpc);

      const handler = this._handlers[method];

      assert(isFunction(handler), `Method '${method}' not found`, ExtError.CODES.METHOD_NOT_FOUND);

      const result = await handler(params);

      if (isError(result)) {
        throw result;
      }

      return createResponse(id, result);
    } catch (error) {
      return createError(id, error);
    }
  }

  static _validateRequest (id: number, jsonrpc: string): void {
    assert(jsonrpc === '2.0', `Invalid jsonrpc field, expected '2.0', got '${jsonrpc}'`, ExtError.CODES.INVALID_JSONRPC);

    assert(!isUndefined(id), "Expected a defined id, received 'undefined'", ExtError.CODES.INVALID_JSONRPC);

    assert(isNumber(id), `Expected a numeric id, got '${id}'`, ExtError.CODES.INVALID_JSONRPC);
  }

  static _validateConfig ({ path, port, type }: RpcConfigType): void {
    assert(isNumber(port), `Cannot instantiate with non-numeric port='${port}'`);

    assert(Array.isArray(type), `Type should be specified as Array ['http', 'ws']`);

    const invalidTypes = type.filter((_type) => !['http', 'ws'].includes(_type));

    assert(invalidTypes.length === 0, `Invalid RPC type found: ${invalidTypes.join(', ')}`);
  }

  static _validateHandlers (handlers: HandlersType): void {
    const handlerKeys = Object.keys(handlers || {});

    assert(handlerKeys.length > 0, 'Cannot instantiate without handlers');

    const invalidHandlers = handlerKeys
      .filter((key) => !isFunction(handlers[key]))
      .map((key) => `'${key}'`);

    assert(invalidHandlers.length === 0, `Invalid method handlers found: ${invalidHandlers.join(', ')}`);
  }
};
