// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { P2pState } from './types';

import decodeHeader from '@polkadot/primitives/codec/header/decode';

import announceMessage from './message/blockAnnounce';

export default function announceBlock (self: P2pState, hash: Uint8Array, _header: Uint8Array, body: Uint8Array): void {
  if (!self.peers) {
    return;
  }

  const header = decodeHeader(_header);
  const message = announceMessage({ header });

  self.peers.peers().forEach((peer) => {
    if (header.number.gt(peer.getBestNumber())) {
      peer.send(message);
    }
  });
}
