// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BlockResponseMessage } from '../message/types';
import type { P2pState, MessageInterface, PeerInterface } from '../types';

const message = require('../message/blockResponse');
const processBlocks = require('../sync/processBlocks');

module.exports = function handleBlockResponse (self: P2pState, peer: PeerInterface, message: MessageInterface): void {
  self.l.debug(() => [peer.shortId, 'BlockResponse', JSON.stringify(message.encode().message)]);

  processBlocks(self, peer, (message.raw: BlockResponseMessage));
};

module.exports.TYPE = message.TYPE;
