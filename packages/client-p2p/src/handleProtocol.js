// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { LibP2P$Connection } from 'libp2p';
import type { P2pState } from './types';

const promisify = require('@polkadot/util/promisify');

const defaults = require('./defaults');
const dialPeers = require('./dialPeers');

module.exports = function handleProtocol (self: P2pState): void {
  const { l, node, peers } = self;

  node.handle(
    defaults.PROTOCOL,
    async (protocol: string, connection: LibP2P$Connection): Promise<void> => {
      try {
        const peerInfo = await promisify(connection, connection.getPeerInfo);
        const peer = peers.add(peerInfo);

        peers.log('protocol', peer);
        peer.addConnection(connection, false);

        if (!peer.isWritable()) {
          dialPeers(self, peer);
        }
      } catch (error) {
        l.error('protocol handling error', error);
      }
    }
    , (protocol: string, requested: string, callback: (error: null, accept: boolean) => void): void => {
      l.debug(() => `matching protocol ${requested}`);

      callback(null, requested.indexOf(defaults.PROTOCOL) === 0);
    }
  );
};
