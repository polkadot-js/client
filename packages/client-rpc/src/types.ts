// Copyright 2017-2019 @polkadot/client-rpc authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import EventEmitter from 'eventemitter3';
import * as net from 'net';
import * as Koa from 'koa';
import { Config } from '@polkadot/client/types';
import { ChainInterface } from '@polkadot/client-chains/types';
import { Logger } from '@polkadot/util/types';
import { Handler, Handlers } from './handlers/types';

export interface JsonRpcBase {
  id: number;
  jsonrpc: '2.0';
}

export interface JsonRpcError extends JsonRpcBase {
  error: {
    code: number;
    message: string;
  };
}

export interface JsonRpcRequest extends JsonRpcBase {
  method: string;
  params: any[];
}

export interface JsonRpcSubscription extends JsonRpcBase {
  method: string;
  params: {
    error?: Error;
    result: any;
    subscription: number;
  };
}

export interface JsonRpcResponse extends JsonRpcBase {
  result: any;
}

export type Rpc = 'http' | 'ws';

export interface RpcConfig {
  active: boolean;
  path: string;
  port: number;
  types: Rpc[];
}

export type RpcInterface$Events = 'started' | 'stopped';

export interface WsContextSocket {
  on: (type: 'close' | 'message', cb: (message: string) => void | Promise<void>) => void;
  send: (message: string) => void | Promise<void>;
}

export type WsContext = Koa.Context & {
  websocket: WsContextSocket;
};

export interface RpcInterface {
  on (type: RpcInterface$Events, cb: () => any): any;
  start (): Promise<boolean>;
  stop (): Promise<boolean>;
}

export type SubInterface = (socket: WsContextSocket | undefined, handler: Handler, params: any[]) => Promise<number>;

export interface RpcState {
  chain: ChainInterface;
  config: Config;
  emitter: EventEmitter;
  handlers: Handlers;
  l: Logger;
  servers: net.Server[];
  subscribe: SubInterface;
}
