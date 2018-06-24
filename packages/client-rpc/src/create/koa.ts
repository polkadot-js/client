// Copyright 2017-2018 @polkadot/client-rpc authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Rpc, PostContext, WsContext } from '../types';

import Koa from 'koa';
import koaRoute from 'koa-route';
import koaWebsocket from 'koa-websocket';

type CreateKoaOption = {
  handlers: {
    http: (ctx: PostContext) => any,
    ws: (ctx: WsContext) => any
  },
  path: string,
  types: Array<Rpc>
};

export default function createKoa ({ handlers, path, types }: CreateKoaOption): Array<Koa> {
  return types.map((type) => {
    switch (type) {
      case 'http':
        return (() => {
          const app = new Koa();

          app.use(
            koaRoute.post(path, handlers.http)
          );

          return app;
        })();

      case 'ws':
        return (() => {
          const app = koaWebsocket(new Koa());

          app.ws.use(
            koaRoute.all(path, handlers.ws)
          );

          return app;
        })();

      default:
        (type as never); // eslint-disable-line
        throw new Error(`Uanble to create RPC listener for ${type}`);
    }
  });
}
