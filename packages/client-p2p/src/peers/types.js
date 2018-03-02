// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type EventEmitter from 'eventemitter3';
import type { Logger } from '@polkadot/util/types';
import type { PeerInterface } from '../types';

export type PeersState = {
  emitter: EventEmitter,
  l: Logger,
  peers: { [string]: PeerInterface }
};

export type PeerEventHandler = (peerInfo: PeerInfo) => boolean;
