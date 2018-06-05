// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { LibP2P$Connection } from 'libp2p';
import type { PeerState } from './types';

const pull = require('pull-stream');
const bufferToU8a = require('@polkadot/util/buffer/toU8a');
const u8aToHex = require('@polkadot/util/u8a/toHex');

const decode = require('../message/decode');

module.exports = function onReceive ({ emitter, l, pushable }: PeerState, connection: LibP2P$Connection): boolean {
  const drain = pull.drain(
    (buffer: Buffer): void => {
      const u8a = bufferToU8a(buffer);

      l.debug(() => `Received ${u8aToHex(u8a)}`);

      emitter.emit('message', decode(u8a));
    },
    () => false
  );

  try {
    pull(pushable, connection);
    pull(connection, drain);
  } catch (error) {
    return false;
  }

  return true;
};
