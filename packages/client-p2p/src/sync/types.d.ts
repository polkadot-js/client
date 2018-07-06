// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import BN from 'bn.js';
import { BlockResponseMessageBlock } from '@polkadot/client-p2p-messages/types';
import { PeerInterface, SyncStatus } from '../types';

import BlockRequest from '@polkadot/client-p2p-messages/BlockRequest';

export type SyncState$Request = {
  peer: PeerInterface,
  request: BlockRequest
}

export type SyncState = {
  blockRequests: {
    [index: string]: SyncState$Request
  },
  blockQueue: {
    [index: string]: BlockResponseMessageBlock
  },
  status: SyncStatus
};
