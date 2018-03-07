// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { MessageInterface, PeerInterface } from '../types';
import type { P2pState } from '../server/types';

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

module.exports = function handleMessage (self: P2pState, peer: PeerInterface, message: MessageInterface): void {
  self.emitter.emit('message', {
    peer,
    message
  });

  const handler = HANDLERS.find((handler) => handler.TYPE === message.type);

  if (!handler) {
    self.l.error(`Unhandled message type=${message.type}`);
    return;
  }

  return handler(self, peer, message);
};
