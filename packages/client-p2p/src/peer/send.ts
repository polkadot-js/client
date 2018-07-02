// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { MessageInterface } from '@polkadot/client-p2p-messages/types';
import { PeerState } from './types';

import varint from 'varint';
import bufferToU8a from '@polkadot/util/buffer/toU8a';
import u8aConcat from '@polkadot/util/u8a/concat';
import u8aToHex from '@polkadot/util/u8a/toHex';
import u8aFromUtf8 from '@polkadot/util/u8a/fromUtf8';
import u8aToBuffer from '@polkadot/util/u8a/toBuffer';

export default function send ({ l, pushable }: PeerState, message: MessageInterface): boolean {
  if (pushable === undefined) {
    return false;
  }

  try {
    const utf8 = JSON.stringify(message.encode());
    const encoded = u8aFromUtf8(utf8);
    const length = varint.encode(encoded.length + 1);

    l.debug(() => `sending ${u8aToHex(encoded)} <= ${utf8}`);

    pushable.push(
      u8aToBuffer(
        u8aConcat(
          bufferToU8a(length),
          new Uint8Array([0]),
          encoded
        )
      )
    );
  } catch (error) {
    l.error('send error', error);
    return false;
  }

  return true;
}
