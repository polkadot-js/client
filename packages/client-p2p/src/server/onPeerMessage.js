// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { MessageInterface, PeerInterface } from '../types';
import type { P2pState } from './types';

const StatusMessage = require('../message/status');

module.exports = function onPeerMessage (self: P2pState): void {
  self.peers.on('message', ({ peer, message }: { peer: PeerInterface, message: MessageInterface }): void => {
    if (message.id === StatusMessage.MESSAGE_ID) {
      peer.setStatus(message);
    }

    self.emitter.emit('message', {
      peer,
      message
    });
  });
};
