// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { RpcType, PostContextType, WsContextType } from '../types';

type CreateKoaOptionType = {
  handlers: {
    http: (ctx: PostContextType) => Promise<void>,
    ws: (ctx: WsContextType) => Promise<void>
  },
  path: string,
  types: Array<RpcType>
};

const Koa = require('koa');
const koaRoute = require('koa-route');
const koaWebsocket = require('koa-websocket');

module.exports = function createKoa ({ handlers, path, types }: CreateKoaOptionType): Koa {
  let app = new Koa();

  if (types.includes('http')) {
    app.use(
      koaRoute.post(path, handlers.http)
    );
  }

  if (types.includes('ws')) {
    app = koaWebsocket(app);

    // flowlint-next-line unclear-type:off
    (app: any).ws.use(
      koaRoute.all(path, handlers.ws)
    );
  }

  return app;
};
