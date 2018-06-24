// Copyright 2017-2018 @polkadot/client-rpc authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { RpcState } from './types';

import createKoa from './create/koa';
import handlePost from './handlePost';
import handleWs from './handleWs';
import stop from './stop';

export default async function start (self: RpcState): Promise<boolean> {
  stop(self);

  const apps = createKoa({
    handlers: {
      http: handlePost(self),
      ws: handleWs(self)
    },
    path: self.config.rpc.path,
    types: self.config.rpc.types
  });

  self.servers = apps.map((app, index) => {
    const port = self.config.rpc.port + (11 * index);
    const server = app.listen(port);

    self.l.log(`Server started on port=${port} for type=${self.config.rpc.types[index]}`);

    return server;
  });

  self.emitter.emit('started');

  return true;
}
