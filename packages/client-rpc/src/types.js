// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type EventEmitter from 'eventemitter3';
import type { Config } from '@polkadot/client/types';
import type { ChainInterface } from '@polkadot/client-chains/types';
import type { Logger } from '@polkadot/util/types';

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
  params: Array<mixed>
};

export type JsonRpcResponse = JsonRpcBase & {
  result: mixed
};

export type Handler = (mixed) => Promise<mixed>;

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

export type WsContext = {
  websocket: {
    // flowlint-next-line unclear-type:off
    on: (type: 'message', (message: string) => any) => any,
    send: (message: string) => void
  }
};

export type RpcInterface = {
  // flowlint-next-line unclear-type:off
  on (type: RpcInterface$Events, () => any): any,
  start (): Promise<boolean>,
  stop (): Promise<boolean>
}

export type RpcState = {
  chain: ChainInterface,
  config: Config,
  emitter: EventEmitter,
  handlers: Handlers,
  l: Logger,
  server: ?net$Server
};
