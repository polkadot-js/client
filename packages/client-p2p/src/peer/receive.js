// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { LibP2P$Connection } from 'libp2p';
import type { MessageInterface } from '../types';
import type { PeerState } from './types';

const pull = require('pull-stream');
const bufferToU8a = require('@polkadot/util/buffer/toU8a');

const announceMessage = require('../message/blockAnnounce');
const statusMessage = require('../message/status');
const decode = require('../message/decode');
const receiveBlockAnnounce = require('./receiveBlockAnnounce');
const receiveStatus = require('./receiveStatus');

function handleMessage (self: PeerState, message: MessageInterface): void {
  self.emitter.emit('message', message);

  switch (message.id) {
    case statusMessage.MESSAGE_ID:
      return receiveStatus(self, message);

    case announceMessage.MESSAGE_ID:
      return receiveBlockAnnounce(self, message);

    default:
      // Unhandled message
      break;
  }
}

module.exports = function receive (self: PeerState, connection: LibP2P$Connection): boolean {
  try {
    pull(
      self.pushable,
      connection
    );

    pull(
      connection,
      pull.drain(
        (buffer: Buffer): void =>
          handleMessage(self, decode(
            bufferToU8a(buffer)
          )),
        () => false
      )
    );
  } catch (error) {
    return false;
  }

  return true;
};
