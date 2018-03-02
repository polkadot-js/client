// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type EventEmitter from 'eventemitter3';
import type { LibP2P$Connection } from 'libp2p';
import type { Pushable } from 'pull-pushable';
import type StatusMessage from '../message/status';

export type PeerState = {
  connections: Array<LibP2P$Connection>,
  emitter: EventEmitter,
  pushable: Pushable,
  status: ?StatusMessage
}
