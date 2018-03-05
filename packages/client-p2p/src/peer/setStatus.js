// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { MessageInterface } from '../types';
import type { StatusMessage } from '../message/types';
import type { PeerState } from './types';

module.exports = function setStatus (self: PeerState, message: MessageInterface): void {
  // flowlint-next-line unclear-type:off
  self.status = ((message: any): StatusMessage);
};
