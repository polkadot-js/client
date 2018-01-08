// @flow
// FIXME: Context types here are not accurate, rather it aligns with our specific use

import type { Middleware } from 'koa';

declare module 'koa-route' {
  declare type PostContextType = {
    body: string,
    req: http$IncomingMessage,
    type: 'application/json'
  };

  declare type WsContextType = {
    websocket: {
      on: (type: 'message', (message: string) => mixed) => void,
      send: (message: string) => void
    }
  };

  declare module.exports: {
    post: (path: string, handler: (ctx: PostContextType) => Promise<void>) => Middleware;
    all: (path: string, handler: (ctx: WsContextType) => Promise<void>) => Middleware
  }
}
