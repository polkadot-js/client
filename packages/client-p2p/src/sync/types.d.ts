// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import BN from 'bn.js';
import { BlockRequestMessage, BlockResponseMessage$BlockData } from '../message/types';
import { PeerInterface } from '../types';

export type SyncState$Request = {
  peer: PeerInterface,
  request: BlockRequestMessage
}

export type SyncState = {
  blockRequests: {
    [index: string]: SyncState$Request
  },
  blockQueue: {
    [index: string]: BlockResponseMessage$BlockData
  }
};
