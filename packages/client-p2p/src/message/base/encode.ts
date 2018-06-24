// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { RawMessage } from '../../types';
import { MessageState } from '../types';

export default function encode (self: MessageState): RawMessage {
  return {
    message: self.impl.rawEncode(),
    type: self.type
  };
}
