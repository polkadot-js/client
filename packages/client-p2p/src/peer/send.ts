// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { MessageInterface } from '../types';
import { PeerState } from './types';

import u8aToBuffer from '@polkadot/util/u8a/toBuffer';

import encode from '../message/encode';

export default function send ({ l, pushable }: PeerState, message: MessageInterface): boolean {
  if (pushable === undefined) {
    return false;
  }

  try {
    pushable.push(
      u8aToBuffer(
        encode(message)
      )
    );
  } catch (error) {
    l.error('send error', error);
    return false;
  }

  return true;
}
