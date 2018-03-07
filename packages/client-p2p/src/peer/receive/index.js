// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { MessageInterface } from '../../types';
import type { PeerState } from '../types';

const announceMessage = require('../../message/blockAnnounce');
const requestMessage = require('../../message/blockRequest');
const statusMessage = require('../../message/status');
const receiveBlockAnnounce = require('./blockAnnounce');
const receiveBlockRequest = require('./blockRequest');
const receiveStatus = require('./status');

module.exports = function receive (self: PeerState, message: MessageInterface): void {
  self.emitter.emit('message', message);

  switch (message.type) {
    case statusMessage.MESSAGE_ID:
      return receiveStatus(self, message);

    case announceMessage.MESSAGE_ID:
      return receiveBlockAnnounce(self, message);

    case requestMessage.MESSAGE_ID:
      return receiveBlockRequest(self, message);

    default:
      // Unhandled message
      break;
  }
};
