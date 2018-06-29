// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { PeerState } from './types';

import pull from 'pull-stream';
import varint from 'varint';
import assert from '@polkadot/util/assert';
import bufferToU8a from '@polkadot/util/buffer/toU8a';
import u8aToHex from '@polkadot/util/u8a/toHex';
import u8aToUtf8 from '@polkadot/util/u8a/toUtf8';

import decodeMessage from '@polkadot/client-p2p-messages/index';

export default function receive ({ emitter, l }: PeerState, connection: LibP2pConnection): boolean {
  try {
    pull(
      connection,
      pull.drain(
        (buffer: Buffer): void => {
          // NOTE the actual incoming message has a varint prefixed length, strip this
          const length = varint.decode(buffer);
          const offset = varint.decode.bytes;
          const u8a = bufferToU8a(buffer.slice(offset + 1));
          const utf8 = u8aToUtf8(u8a);

          // TODO Do we keep this peer or drop it (like Rust does on invalid messages). Additionally, do we _really_ want to throw here?
          assert(u8a.length === length - 1, 'Invalid buffer length received');

          l.debug(() => `received ${u8aToHex(u8a)} => ${utf8}`);

          emitter.emit('message', decodeMessage(utf8));
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
