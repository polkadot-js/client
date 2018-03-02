// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { LibP2P$Connection } from 'libp2p';
import type { PeerState } from './types';

const pull = require('pull-stream');
const bufferToU8a = require('@polkadot/util/buffer/toU8a');

const rlpDecode = require('../rlp/decode');

module.exports = function receive (self: PeerState, connection: LibP2P$Connection): boolean {
  try {
    pull(
      self.pushable,
      connection
    );

    pull(
      connection,
      pull.drain(
        (buffer: Buffer): void => {
          self.emitter.emit('message', rlpDecode(
            bufferToU8a(buffer)
          ));
        },
        () => false
      )
    );
  } catch (error) {
    return false;
  }

  return true;
};
