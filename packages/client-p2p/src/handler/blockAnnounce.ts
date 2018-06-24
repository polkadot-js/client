// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { BlockAnnounceMessage } from '../message/types';
import { P2pState, MessageInterface, PeerInterface } from '../types';
import { Handler } from './types';

import encodeHeader from '@polkadot/primitives-codec/header/encode';
import blake2Asu8a from '@polkadot/util-crypto/blake2/asU8a';

import message from '../message/blockAnnounce';
import requestsBlocks from '../sync/requestBlocks';

function handleBlockAnnounce (self: P2pState, peer: PeerInterface, message: MessageInterface): void {
  self.l.debug(() => [peer.shortId, 'BlockAnnounce', JSON.stringify(message.encode().message)]);

  const header = (message.raw as BlockAnnounceMessage).header;

  if (peer.getBestNumber().lt(header.number)) {
    peer.setBest(header.number, blake2Asu8a(
      encodeHeader(header),
      256
    ));
  }

  requestsBlocks(self, peer);
}

(handleBlockAnnounce as Handler).TYPE = message.TYPE;

export default (handleBlockAnnounce as Handler);
