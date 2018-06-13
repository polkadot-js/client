// Copyright 2017-2018 @polkadot/client-p2p authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BlockAnnounceMessage } from '../message/types';
import type { P2pState, MessageInterface, PeerInterface } from '../types';

const encodeHeader = require('@polkadot/primitives-codec/header/encode');
const blake2Asu8a = require('@polkadot/util-crypto/blake2/asU8a');

const message = require('../message/blockAnnounce');
const requestsBlocks = require('../sync/requestBlocks');

module.exports = function handleBlockAnnounce (self: P2pState, peer: PeerInterface, message: MessageInterface): void {
  self.l.debug(() => [peer.shortId, 'BlockAnnounce', JSON.stringify(message.encode().message)]);

  const header = (message.raw: BlockAnnounceMessage).header;

  if (peer.getBestNumber().lt(header.number)) {
    peer.setBest(header.number, blake2Asu8a(
      encodeHeader(header),
      256
    ));
  }

  requestsBlocks(self, peer);
};

module.exports.TYPE = message.TYPE;
