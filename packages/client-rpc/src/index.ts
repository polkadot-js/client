// Copyright 2017-2018 @polkadot/client-rpc authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import EventEmitter from 'eventemitter3';
import * as Koa from 'koa';
import * as net from 'net';
import { Config } from '@polkadot/client/types';
import { ChainInterface } from '@polkadot/client-chains/types';
import { Handlers } from './handlers/types';
import { JsonRpcError, JsonRpcRequest, JsonRpcResponse, RpcInterface, SubInterface, WsContext, WsContext$Socket } from './types';

import coBody from 'co-body';
import { ExtError, assert, isError, isFunction, isUndefined, logger } from '@polkadot/util';

import handlers from './handlers';
import { validateConfig, validateRequest } from './validate';
import subscriptions from './subscriptions';
import createKoa from './create/koa';
import { createError, createResponse } from './create';

const SUBSCRIBE_REGEX = /_subscribe/;

const l = logger('rpc');

export default class Rpc extends EventEmitter implements RpcInterface {
  private config: Config;
  private handlers: Handlers;
  private servers: Array<net.Server>;
  private subscribe: SubInterface;

  constructor (config: Config, chain: ChainInterface) {
    super();

    this.config = config;
    this.handlers = handlers(config, chain);
    this.servers = [];
    this.subscribe = subscriptions(chain);

    validateConfig(config.rpc);
  }

  async start (): Promise<boolean> {
    await this.stop();

    const apps = createKoa({
      handlers: {
        http: this.handlePost,
        ws: this.handleWs
      },
      path: this.config.rpc.path,
      types: this.config.rpc.types
    });

    this.servers = apps.map((app, index) => {
      const port = this.config.rpc.port + (11 * index);
      const server = app.listen(port);

      l.log(`Server started on port=${port} for type=${this.config.rpc.types[index]}`);

      return server;
    });

    this.emit('started');

    return true;
  }

  async stop (): Promise<boolean> {
    if (this.servers.length === 0) {
      return false;
    }

    const servers = this.servers;

    this.servers = [];
    servers.forEach((server) =>
      server.close()
    );

    l.log('Server stopped');
    this.emit('stopped');

    return true;
  }

  private handleRequest = async ({ id, jsonrpc, method, params }: JsonRpcRequest, socket?: WsContext$Socket): Promise<JsonRpcError | JsonRpcResponse> => {
    const isSubscription = SUBSCRIBE_REGEX.test(method);

    if (isSubscription && isUndefined(socket)) {
      throw new Error(`Subscription for '${method}' not available on RPC interface`);
    }

    try {
      validateRequest(id, jsonrpc);

      const handler = this.handlers[method];

      assert(isFunction(handler), `Method '${method}' not found`, ExtError.CODES.METHOD_NOT_FOUND);

      const result = isSubscription
        ? await this.subscribe(socket, handler, params)
        : await handler(params);

      l.debug(() => ['executed', method, params, '->', result]);

      if (isError(result)) {
        throw result;
      }

      return createResponse(id, result);
    } catch (error) {
      return createError(id, error);
    }
  }

  private handleMessage = async (message: string, socket?: WsContext$Socket): Promise<JsonRpcError | JsonRpcResponse> => {
    try {
      return this.handleRequest(JSON.parse(message), socket);
    } catch (error) {
      return createError(0, error);
    }
  }

  private handlePost = async (ctx: Koa.Context): Promise<void> => {
    const message: string = await coBody.text(ctx.req);
    const response = await this.handleMessage(message);

    ctx.type = 'application/json';
    ctx.body = JSON.stringify(response);
  }

  private handleWs = (ctx: WsContext): void => {
    ctx.websocket.on('message', async (message: string) => {
      const response = await this.handleMessage(message, ctx.websocket);

      ctx.websocket.send(
        JSON.stringify(response)
      );
    });
  }
}
