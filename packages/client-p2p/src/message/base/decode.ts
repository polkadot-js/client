// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { RawMessage } from '../../types';
import { MessageState } from '../types';

import assert from '@polkadot/util/assert';
import isUndefined from '@polkadot/util/is/undefined';

export default function decode (self: MessageState, { type, message }: RawMessage): any {
  assert(type === self.type, 'Expected message id to match');
  assert(!isUndefined(message[self.name]), `Unable to find root '${self.name}'`);

  return {
    message: self.impl.rawDecode(message[self.name]),
    type
  };
}
