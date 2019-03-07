// Copyright 2017-2019 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { P2pInterface, PeerInterface } from '../types';
import { Handler } from './types';

import { BlockAnnounce } from '@polkadot/client-types/messages';
import { Header } from '@polkadot/types';

function handleBlockAnnounce (self: P2pInterface, peer: PeerInterface, message: BlockAnnounce): void {
  // self.l.debug(() => [peer.shortId, 'BlockAnnounce', JSON.stringify(message)]);

  const header = message.header;

  if (peer.bestNumber.lt(header.blockNumber)) {
    peer.setBest(header.blockNumber, (new Header(header)).hash);
  }

  self.sync.requestBlocks(peer);
}

(handleBlockAnnounce as Handler).type = BlockAnnounce.type;

export default (handleBlockAnnounce as Handler);
