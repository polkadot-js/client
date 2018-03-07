// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { RawMessage } from '../../types';
import type { MessageState } from '../types';

module.exports = function encode (self: MessageState): RawMessage {
  return {
    message: self.impl.rawEncode(),
    type: self.type
  };
};
