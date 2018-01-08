// @flow

import type Koa from 'koa';

declare module 'koa-websocket' {
  declare type WsContextType = {
    websocket: {
      on: (type: 'message', (message: string) => mixed) => void,
      send: (message: string) => void
    }
  };

  declare module.exports: {
    (app: Koa): Koa;

    all: (path: string, handler: (ctx: WsContextType) => Promise<void>) => void
  }
}
