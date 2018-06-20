// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { MessageInterface, RawMessage } from '../types';

import u8aToUtf8 from '@polkadot/util/u8a/toUtf8';

import createMessage from './create';

export default function decode (u8a: Uint8Array): MessageInterface {
  const message: RawMessage = JSON.parse(
    u8aToUtf8(u8a)
  );
  const instance = createMessage(message.type);

  instance.decode(message);

  return instance;
}
