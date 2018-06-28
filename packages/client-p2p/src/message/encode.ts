// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { MessageInterface } from '../types';

import u8aConcat from '@polkadot/util/u8a/concat';
import u8aFromUtf8 from '@polkadot/util/u8a/fromUtf8';

export default function encode (message: MessageInterface): Uint8Array {
  return u8aConcat(
    new Uint8Array([message.type]),
    u8aFromUtf8(
      JSON.stringify(
        message.encode()
      )
    )
  );
}
