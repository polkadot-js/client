// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { LibP2P$Connection } from 'libp2p';
import type { P2pState } from './types';

type ProtocolHandler = (protocol: string, connection: LibP2P$Connection) => Promise<void>;

const promisify = require('@polkadot/util/promisify');

module.exports = function onProtocol (self: P2pState): ProtocolHandler {
  return async (protocol: string, connection: LibP2P$Connection): Promise<void> => {
    const peerInfo = await promisify(connection, connection.getPeerInfo);
    const peer = self.peers.add(peerInfo);

    peer.addConnection(connection);
  };
};
