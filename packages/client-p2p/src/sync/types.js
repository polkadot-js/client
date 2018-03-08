// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BlockRequestMessage } from '../message/types';
import type { PeerInterface } from '../types';

export type SyncState$Request = {
  peer: PeerInterface,
  request: BlockRequestMessage
}

export type SyncState = {
  blockRequests: {
    [number]: SyncState$Request
  }
};
