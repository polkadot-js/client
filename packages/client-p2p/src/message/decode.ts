// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { MessageInterface, RawMessage } from '../types';

import isUndefined from '@polkadot/util/is/undefined';
import u8aToUtf8 from '@polkadot/util/u8a/toUtf8';

import createMessage from './create';

export default function decode (u8a: Uint8Array): MessageInterface {
  const utf8 = u8aToUtf8(u8a);
  const parsed = JSON.parse(utf8);

  const message: RawMessage = {
    message: parsed,
    type: (() => {
      if (!isUndefined(parsed.BlockAnnounce)) {
        return 3;
      } else if (!isUndefined(parsed.BlockResponse)) {
        return 2;
      } else if (!isUndefined(parsed.BlockRequest)) {
        return 1;
      } else if (!isUndefined(parsed.Status)) {
        return 0;
      } else {
        throw new Error(`Unknown message received, ${utf8}`);
      }
    })()
  };
  const instance = createMessage(message.type);

  instance.decode(message);

  return instance;
}
