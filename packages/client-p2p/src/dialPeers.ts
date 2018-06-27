// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { P2pState, PeerInterface } from './types';

import promisify from '@polkadot/util/promisify';

import defaults from './defaults';

type QueuedPeer = {
  peer: PeerInterface,
  isDialled: boolean
};

const dialQueue: Array<QueuedPeer> = [];

async function dialPeer ({ chain, config, l, node }: P2pState, peer: PeerInterface): Promise<void> {
  l.debug(() => `dialing ${peer.shortId}`);

  try {
    const connection = await promisify(
      node, node.dialProtocol, peer.peerInfo, defaults.PROTOCOL
    );

    peer.addConnection(connection, true);
  } catch (error) {
    // l.error('dial error', error);
  }
}

export default function dialPeers (self: P2pState, peer?: PeerInterface): void {
  if (peer !== undefined) {
    dialQueue.push({
      isDialled: false,
      peer
    });
  }

  if (!self.node.isStarted()) {
    return;
  }

  dialQueue.forEach(
    async (item: QueuedPeer): Promise<void> => {
      if (item.isDialled) {
        return;
      }

      item.isDialled = true;

      return dialPeer(self, item.peer);
    }
  );
}
