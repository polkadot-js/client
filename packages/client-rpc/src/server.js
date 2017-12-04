// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { HandlersType, JsonRpcError, JsonRpcRequest, JsonRpcResponse, RpcConfigType, RpcType } from './types';

type PostContextType = {
  body: string,
  req: string,
  type: 'application/json'
};

type WsContextType = {
  websocket: {
    on: (type: 'message', (message: string) => any) => void,
    send: (message: string) => void
  }
};

const coBody = require('co-body');
const Koa = require('koa');
const koaRoute = require('koa-route');
const koaWebsocket = require('koa-websocket');

const assert = require('@polkadot/util/assert');
const ExtError = require('@polkadot/util/ext/error');
const l = require('@polkadot/util/logger')('rpc');
const isError = require('@polkadot/util/is/error');
const isFunction = require('@polkadot/util/is/function');

const defaults = require('./defaults');
const { createError, createResponse } = require('./jsonrpc');
const { validateConfig, validateRequest, validateHandlers } = require('./validate');

module.exports = class RPCServer {
  _handlers: HandlersType;
  _path: string;
  _port: number;
  _server: ?net$Server;
  _type: Array<RpcType>;

  constructor ({ path = defaults.PATH, port = defaults.PORT, type = defaults.TYPE }: RpcConfigType, handlers: HandlersType, autoStart: boolean = true) {
    validateConfig({ path, port, type });
    validateHandlers(handlers);

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

      l.log('Client stopped');
    }
  }

  start () {
    this.stop();

    const hasHttp = this._type.includes('http');
    const hasWs = this._type.includes('ws');
    const app = hasWs
      ? koaWebsocket(new Koa())
      : new Koa();

    if (hasHttp) {
      app.use(
        koaRoute.post(this._path, this._handlePost)
      );
    }

    if (hasWs) {
      (app: any).ws.use(
        koaRoute.all(this._path, this._handleWs)
      );
    }

    this._server = app.listen(this._port);

    l.log(`Client started on port=${this._port} for type=[${this._type.join(',')}]`);
  }

  _handlePost = async (ctx: PostContextType): Promise<void> => {
    const body = await coBody.text(ctx.req);
    const response = await this._handleMessage(body);

    ctx.type = 'application/json';
    ctx.body = JSON.stringify(response);
  }

  _handleWs = async (ctx: WsContextType): Promise<void> => {
    ctx.websocket.on('message', async (message: string) => {
      const response = await this._handleMessage(message);

      ctx.websocket.send(
        JSON.stringify(response)
      );
    });
  }

  _handleMessage = async (message: string): Promise<JsonRpcError | JsonRpcResponse> => {
    try {
      const { id, jsonrpc, method, params }: JsonRpcRequest = JSON.parse(message);

      try {
        validateRequest(id, jsonrpc);

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
    } catch (error) {
      return createError(0, error);
    }
  }
};
