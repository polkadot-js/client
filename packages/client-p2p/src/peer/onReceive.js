// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { LibP2P$Connection } from 'libp2p';
import type { PeerState } from './types';

const pull = require('pull-stream');
const bufferToU8a = require('@polkadot/util/buffer/toU8a');

const decode = require('../message/decode');

module.exports = function onReceive ({ emitter, pushable }: PeerState, connection: LibP2P$Connection): boolean {
  try {
    pull(
      pushable,
      connection
    );

    pull(
      connection,
      pull.drain(
        (buffer: Buffer): void => {
          emitter.emit('message', decode(
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
