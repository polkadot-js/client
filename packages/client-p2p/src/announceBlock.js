// Copyright 2017-2018 @polkadot/client-p2p authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { P2pState } from './types';

const decodeHeader = require('@polkadot/primitives-codec/header/decode');

const announceMessage = require('./message/blockAnnounce');

module.exports = function announceBlock (self: P2pState, hash: Uint8Array, _header: Uint8Array, body: Uint8Array): void {
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
};
