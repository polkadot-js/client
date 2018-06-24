// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import EventEmitter from 'eventemitter3';
import { Config } from '@polkadot/client/types';
import { ChainInterface } from '@polkadot/client-chains/types';
import { Logger } from '@polkadot/util/types';
import { PeerInterface } from '../types';

export type PeersState = {
  chain: ChainInterface,
  config: Config,
  emitter: EventEmitter,
  l: Logger,
  peers: { [string]: PeerInterface }
};

export type PeerEventHandler = (peerInfo: PeerInfo) => boolean;
