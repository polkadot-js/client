// ISC, Copyright 2017 Jaco Greeff
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
  params: Array<any>
};

export type JsonRpcResponse = JsonRpcBase & {
  result: any
};

export type HandlerType = (...params: Array<any>) => Promise<JsonRpcError | JsonRpcResponse>;

export type HandlersType = {
  [string]: HandlerType
};

export type RpcConfigType = {
  path: string,
  port: number
};