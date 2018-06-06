// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { LibP2P$Connection } from 'libp2p';
import type { P2pState } from './types';

const promisify = require('@polkadot/util/promisify');

const defaults = require('./defaults');

module.exports = function handleProtocol ({ chain, config, l, node, peers }: P2pState): void {
  node.handle(
    defaults.PROTOCOL,
    async (protocol: string, connection: LibP2P$Connection): Promise<void> => {
      l.debug(() => 'protocol connected');

      try {
        const peerInfo = await promisify(connection, connection.getPeerInfo);
        const peer = peers.add(peerInfo);

        l.debug(() => [`adding connection, sending status`, peer.shortId]);

        peer.addConnection(connection);
      } catch (error) {
        l.error('protocol handling error', error);
      }
    }
    , (protocol: string, requested: string, callback: (error: null, accept: boolean) => void): void => {
      l.debug(() => `matching protocol ${protocol} with ${requested}`);

      callback(null, requested.indexOf(defaults.PROTOCOL) === 0);
    }
  );
};
