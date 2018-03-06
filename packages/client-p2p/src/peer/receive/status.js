// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { MessageInterface } from '../../types';
import type { StatusMessage } from '../../message/types';
import type { PeerState } from '../types';

// TODO: We should check the genesisHash here and act appropriately
module.exports = function receiveStatus (self: PeerState, message: MessageInterface): void {
  const status = (message.raw: StatusMessage);

  self.bestHash = status.bestHash;
  self.bestNumber = status.bestNumber;
};
