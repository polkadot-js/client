// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { BlockRequestMessage, BlockResponseMessage$BlockData } from '../message/types';
import type { PeerInterface } from '../types';

export type SyncState$Request = {
  peer: PeerInterface,
  request: BlockRequestMessage
}

export type SyncState = {
  blockRequests: {
    [string]: SyncState$Request
  },
  blockQueue: {
    [BN]: BlockResponseMessage$BlockData
  }
};
