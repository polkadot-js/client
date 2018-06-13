// Copyright 2017-2018 @polkadot/client-p2p authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BlockRequestMessage } from '../message/types';
import type { P2pState, MessageInterface, PeerInterface } from '../types';

const message = require('../message/blockRequest');
const provideBlocks = require('../sync/provideBlocks');

module.exports = function handleBlockRequest (self: P2pState, peer: PeerInterface, message: MessageInterface): void {
  self.l.debug(() => [peer.shortId, 'BlockRequest', JSON.stringify(message.encode().message)]);

  provideBlocks(self, peer, (message.raw: BlockRequestMessage));
};

module.exports.TYPE = message.TYPE;
