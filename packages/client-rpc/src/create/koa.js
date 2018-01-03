// ISC, Copyright 2017-2018 Jaco Greeff
// @flow

import type { RpcType } from '../types';

type CreateKoaOptionType = {
  handlers: {
    http: Function,
    ws: Function
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

    (app: any).ws.use(
      koaRoute.all(path, handlers.ws)
    );
  }

  return app;
};
