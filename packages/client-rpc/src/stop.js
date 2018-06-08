// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { RpcState } from './types';

module.exports = async function stop (self: RpcState): Promise<boolean> {
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
};
