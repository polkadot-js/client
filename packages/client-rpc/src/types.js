// ISC, Copyright 2017-2018 Jaco Greeff
// @flow

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

export type HandlerType = (mixed) => Promise<mixed>;

export type HandlersType = {
  [string]: HandlerType
};

export type RpcType = 'http' | 'ws';

export type RpcConfigType = {
  path: string,
  port: number,
  types: Array<RpcType>
};

export type RpcInterface$Events = 'started' | 'stopped';

export interface RpcInterface {
  // flowlint-next-line unclear-type:off
  on (type: RpcInterface$Events, () => any): any;
}

export type PostContextType = {
  body: string,
  req: http$IncomingMessage,
  type: 'application/json'
};

export type WsContextType = {
  websocket: {
    // flowlint-next-line unclear-type:off
    on: (type: 'message', (message: string) => any) => any,
    send: (message: string) => void
  }
};
