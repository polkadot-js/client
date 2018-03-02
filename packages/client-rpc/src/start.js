// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { RpcState, PostContextType, WsContextType } from './types';

const createKoa = require('./create/koa');

const handlePost = require('./handle/post');
const handleWs = require('./handle/ws');
const stop = require('./stop');

module.exports = async function start (self: RpcState): Promise<boolean> {
  stop(self);

  const app = createKoa({
    handlers: {
      http: (ctx: PostContextType): Promise<void> =>
        handlePost(self, ctx),
      ws: (ctx: WsContextType): Promise<void> =>
        handleWs(self, ctx)
    },
    path: self.config.rpc.path,
    types: self.config.rpc.types
  });

  self.server = app.listen(self.config.rpc.port);

  self.l.log(`Server started on port=${self.config.rpc.port} for types=${self.config.rpc.types.join(',')}`);
  self.emitter.emit('started');

  return true;
};
