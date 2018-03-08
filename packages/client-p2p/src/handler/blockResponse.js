// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BlockResponseMessage } from '../message/types';
import type { P2pState } from '../server/types';
import type { MessageInterface, PeerInterface } from '../types';

const message = require('../message/blockResponse');
const queueBlocks = require('../sync/queueBlocks');

module.exports = function handleBlockResponse (self: P2pState, peer: PeerInterface, message: MessageInterface): void {
  self.l.debug(() => [peer.shortId, 'BlockResponse', JSON.stringify(message.encode().message)]);

  queueBlocks(self, peer, (message.raw: BlockResponseMessage));
};

module.exports.TYPE = message.TYPE;
