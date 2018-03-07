// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BlockRequestMessage } from '../message/types';

export type SyncState$Request = {
  peerId: string,
  request: BlockRequestMessage
}

export type SyncState = {
  blockRequests: Array<SyncState$Request>
};
