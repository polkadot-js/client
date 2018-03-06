// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Rpc, PostContext, WsContext } from '../types';

type CreateKoaOption = {
  handlers: {
    // flowlint-next-line unclear-type:off
    http: (ctx: PostContext) => any,
    // flowlint-next-line unclear-type:off
    ws: (ctx: WsContext) => any
  },
  path: string,
  types: Array<Rpc>
};

const Koa = require('koa');
const koaRoute = require('koa-route');
const koaWebsocket = require('koa-websocket');

module.exports = function createKoa ({ handlers, path, types }: CreateKoaOption): Koa {
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
