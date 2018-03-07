// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { MessageInterface, PeerInterface } from '../types';
import type { StatusMessage } from '../message/types';
import type { P2pState } from '../server/types';

const message = require('../message/status');

// TODO: We should check the genesisHash here and act appropriately
module.exports = function handleStatus (self: P2pState, peer: PeerInterface, message: MessageInterface): void {
  self.l.debug(() => ['Status', JSON.stringify(message.encode().message)]);

  const { bestHash, bestNumber } = (message.raw: StatusMessage);

  peer.setBest(bestNumber, bestHash);
};

module.exports.TYPE = message.TYPE;
