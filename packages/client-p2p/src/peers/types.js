// Copyright 2017-2018 @polkadot/client-p2p authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type EventEmitter from 'eventemitter3';
import type { Config } from '@polkadot/client/types';
import type { ChainInterface } from '@polkadot/client-chains/types';
import type { Logger } from '@polkadot/util/types';
import type { PeerInterface } from '../types';

export type PeersState = {
  chain: ChainInterface,
  config: Config,
  emitter: EventEmitter,
  l: Logger,
  peers: { [string]: PeerInterface }
};

export type PeerEventHandler = (peerInfo: PeerInfo) => boolean;
