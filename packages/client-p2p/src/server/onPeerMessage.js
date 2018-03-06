// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { MessageInterface, PeerInterface } from '../types';
import type { P2pState } from './types';

type Message = {
  peer: PeerInterface,
  message: MessageInterface
};

module.exports = function onPeerMessage (self: P2pState): void {
  self.peers.on('message', ({ peer, message }: Message): void => {
    self.emitter.emit('message', {
      peer,
      message
    });
  });
};
