// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { P2pInterface, PeerInterface } from '../types';
import { Handler } from './types';

import BlockAnnounce from '@polkadot/client-p2p-messages/BlockAnnounce';
import encodeHeader from '@polkadot/primitives/codec/header/encode';
import blake2Asu8a from '@polkadot/util-crypto/blake2/asU8a';

function handleBlockAnnounce (self: P2pInterface, peer: PeerInterface, message: BlockAnnounce): void {
  self.l.debug(() => [peer.shortId, 'BlockAnnounce', JSON.stringify(message.encode())]);

  const header = message.header;

  if (peer.bestNumber.lt(header.number)) {
    peer.setBest(header.number, blake2Asu8a(
      encodeHeader(header),
      256
    ));
  }

  self.sync.requestBlocks(peer);
}

(handleBlockAnnounce as Handler).type = BlockAnnounce.type;

export default (handleBlockAnnounce as Handler);
