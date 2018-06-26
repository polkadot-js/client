// Copyright 2017-2018 @polkadot/client-rpc authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { RpcState } from './types';

export default async function stop (self: RpcState): Promise<boolean> {
  if (self.servers.length === 0) {
    return false;
  }

  const servers = self.servers;

  self.servers = [];
  servers.forEach((server) =>
    server.close()
  );

  self.l.log('Server stopped');
  self.emitter.emit('stopped');

  return true;
}
