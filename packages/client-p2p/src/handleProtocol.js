// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { LibP2P$Connection } from 'libp2p';
import type { P2pState } from './types';

const promisify = require('@polkadot/util/promisify');

const defaults = require('./defaults');

module.exports = function handleProtocol ({ l, node, peers }: P2pState): void {
  node.handle(
    defaults.PROTOCOL_BASE,
    async (protocol: string, connection: LibP2P$Connection): Promise<void> => {
      l.debug(() => `protocol connected, ${protocol}`);

      const peerInfo = await promisify(connection, connection.getPeerInfo);
      const peer = peers.add(peerInfo);

      peer.addConnection(connection);
    },
    (protocol: string, requestedProtocol, callback: (error: null, accept: boolean) => void): void => {
      l.debug(() => `matching protocol ${protocol} with ${requestedProtocol}`);

      callback(null, requestedProtocol.indexOf(defaults.PROTOCOL_BASE) === 0);
    });
};
