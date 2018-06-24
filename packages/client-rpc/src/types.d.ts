// Copyright 2017-2018 @polkadot/client-rpc authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import EventEmitter from 'eventemitter3';
import { Config } from '@polkadot/client/types';
import { ChainInterface } from '@polkadot/client-chains/types';
import { Logger } from '@polkadot/util/types';

export type JsonRpcBase = {
  id: number,
  jsonrpc: '2.0'
};

export type JsonRpcError = JsonRpcBase & {
  error: {
    code: number,
    message: string
  }
};

export type JsonRpcRequest = JsonRpcBase & {
  method: string,
  params: Array<any>
};

export type JsonRpcSubscription = JsonRpcBase & {
  method: string,
  params: {
    error?: Error,
    result: any,
    subscription: number
  }
};

export type JsonRpcResponse = JsonRpcBase & {
  result: any
};

export type Handler = (Array<any>) => Promise<any>;

export type Handlers = {
  [string]: Handler
};

export type Rpc = 'http' | 'ws';

export type RpcConfig = {
  path: string,
  port: number,
  types: Array<Rpc>
};

export type RpcInterface$Events = 'started' | 'stopped';

export type PostContext = {
  body: string,
  req: http$IncomingMessage,
  type: 'application/json'
};

export type WsContext$Socket = {
  on: (type: 'close' | 'message', (message: string) => void | Promise<void>) => void,
  send: (message: string) => void | Promise<void>
};

export type WsContext = {
  websocket: WsContext$Socket
};

export type RpcInterface = {
  on (type: RpcInterface$Events, () => any): any,
  start (): Promise<boolean>,
  stop (): Promise<boolean>
}

export type SubInterface = (socket?: WsContext$Socket, handler: Handler, params: Array<any>) => Promise<number>;

export type RpcState = {
  chain: ChainInterface,
  config: Config,
  emitter: EventEmitter,
  handlers: Handlers,
  l: Logger,
  servers: Array<net$Server>,
  subscribe: SubInterface
};
