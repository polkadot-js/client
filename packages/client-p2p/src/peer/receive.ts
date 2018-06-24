// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { LibP2P$Connection } from 'libp2p';
import { PeerState } from './types';

import pull from 'pull-stream';
import bufferToU8a from '@polkadot/util/buffer/toU8a';
import u8aToHex from '@polkadot/util/u8a/toHex';

import decode from '../message/decode';

export default function receive ({ emitter, l }: PeerState, connection: LibP2P$Connection): boolean {
  try {
    pull(
      connection,
      pull.drain(
        (buffer: Buffer): void => {
          const u8a = bufferToU8a(buffer);

          l.debug(() => `received ${u8aToHex(u8a)}`);

          emitter.emit('message', decode(u8a));
        },
        () => false
      )
    );
  } catch (error) {
    l.error('receive error', error);

    return false;
  }

  return true;
}
