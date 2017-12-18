// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { StateInterface } from '@polkadot/client-state/types';
import type { HandlersType, JsonRpcError, JsonRpcRequest, JsonRpcResponse, RpcConfigType, RpcInterface } from './types';

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
const EventEmitter = require('eventemitter3');

const assert = require('@polkadot/util/assert');
const ExtError = require('@polkadot/util/ext/error');
const l = require('@polkadot/util/logger')('rpc');
const isError = require('@polkadot/util/is/error');
const isFunction = require('@polkadot/util/is/function');

const { createKoa, createError, createResponse } = require('./create');
const { validateConfig, validateRequest, validateHandlers } = require('./validate');

module.exports = class RPCServer extends EventEmitter implements RpcInterface {
  _config: RpcConfigType;
  _handlers: HandlersType;
  _server: ?net$Server;
  _state: StateInterface;

  constructor (state: StateInterface, handlers: HandlersType, autoStart: boolean = true) {
    super();

    this._config = state.config.rpc;
    this._state = state;

    validateConfig(this._config);
    validateHandlers(handlers);

    this._handlers = handlers;
    this._server = null;

    if (autoStart) {
      this.start();
    }
  }

  async start (): Promise<boolean> {
    this.stop();

    const app = createKoa({
      handlers: {
        http: this._handlePost,
        ws: this._handleWs
      },
      path: this._config.path,
      types: this._config.types
    });

    this._server = app.listen(this._config.port);

    l.log(`Server started on port=${this._config.port} for type=${this._config.types.join(',')}`);
    this.emit('started');

    return true;
  }

  async stop (): Promise<boolean> {
    if (!this._server) {
      return false;
    }

    const server = this._server;

    this._server = null;
    server.close();

    l.log('Server stopped');
    this.emit('stopped');

    return true;
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
