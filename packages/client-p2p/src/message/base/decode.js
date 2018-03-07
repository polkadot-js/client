// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { RawMessage } from '../../types';
import type { MessageState } from '../types';

const assert = require('@polkadot/util/assert');

// flowlint-next-line unclear-type:off
module.exports = function decode (self: MessageState, { type, message }: RawMessage): any {
  assert(type === self.type, 'Expected message id to match');

  return {
    message: self.impl.rawDecode(message),
    type
  };
};
