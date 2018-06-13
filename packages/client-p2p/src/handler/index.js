// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { P2pState, MessageInterface, PeerInterface } from '../types';

type Message = {
  peer: PeerInterface,
  message: MessageInterface
};

type Handler = {
  (self: P2pState, peer: PeerInterface, message: MessageInterface): void,
  TYPE: number
};

const blockAnnounce = require('./blockAnnounce');
const blockRequest = require('./blockRequest');
const blockResponse = require('./blockResponse');
const status = require('./status');

const HANDLERS: Array<Handler> = [
  blockAnnounce, blockRequest, blockResponse, status
];

module.exports = function onPeerMessage (self: P2pState): void {
  self.peers.on('message', ({ peer, message }: Message): void => {
    const handler = HANDLERS.find((handler) => handler.TYPE === message.type);

    if (!handler) {
      self.l.error(`Unhandled message type=${message.type}`);
      return;
    }

    handler(self, peer, message);
  });
};
