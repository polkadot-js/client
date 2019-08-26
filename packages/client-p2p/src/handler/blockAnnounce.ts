// Copyright 2017-2019 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { P2pInterface, PeerInterface } from '../types';
import { Handler } from './types';

import { BlockAnnounce } from '@polkadot/client-types/messages';
import { createType } from '@polkadot/types';

function handleBlockAnnounce ({ sync }: P2pInterface, peer: PeerInterface, message: BlockAnnounce): void {
  // self.l.debug(() => [peer.shortId, 'BlockAnnounce', JSON.stringify(message)]);

  const header = message.header;
  const blockNumber = header.number.unwrap();

  if (peer.bestNumber.lt(blockNumber)) {
    peer.setBest(blockNumber, createType('Header', header).hash);
  }

  sync.requestBlocks(peer);
}

(handleBlockAnnounce as Handler).type = BlockAnnounce.type;

export default (handleBlockAnnounce as Handler);
