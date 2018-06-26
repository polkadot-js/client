// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { MessageInterface, RawMessage } from '../../types';
import { MessageImpl } from '../types';

import decode from './decode';
import encode from './encode';

export default function base <T, E> (type: number, impl: MessageImpl): MessageInterface {
  const self = {
    type,
    impl
  };

  return {
    decode: (data: RawMessage): any =>
      decode(self, data),
    encode: (): RawMessage =>
      encode(self),
    raw: impl.raw,
    type
  };
}
