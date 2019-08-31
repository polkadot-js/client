// Copyright 2017-2019 @polkadot/client-rpc authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Rpc } from '../types';

import Koa from 'koa';
import koaRoute from 'koa-route';
import koaWebsocket from 'koa-websocket';

interface CreateKoaOption {
  handlers: {
    http: (...params: any[]) => any;
    ws: (...params: any[]) => any;
  };
  path: string;
  types: Rpc[];
}

export default function createKoa ({ handlers, path, types }: CreateKoaOption): Koa[] {
  return types.map((type): Koa => {
    switch (type) {
      case 'http':
        return ((): Koa => {
          const app = new Koa();

          app.use(
            koaRoute.post(path, handlers.http)
          );

          return app;
        })();

      case 'ws':
        return ((): Koa => {
          const app = koaWebsocket(new Koa());

          app.ws.use(
            koaRoute.all(path, handlers.ws)
          );

          return app;
        })();

      default:
        // eslint-disable-next-line no-unused-expressions,@typescript-eslint/no-unnecessary-type-assertion
        (type as never);
        throw new Error(`Uanble to create RPC listener for ${type}`);
    }
  });
}
