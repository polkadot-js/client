// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import E3 from 'eventemitter3';
import { Config } from '@polkadot/client/types';
import { ChainInterface } from '@polkadot/client-chains/types';
import { Logger } from '@polkadot/util/types';
import { PeerInterface } from '../types';

export type PeersState = {
  chain: ChainInterface,
  config: Config,
  emitter: E3.EventEmitter,
  l: Logger,
  peers: {
    [index: string]: PeerInterface
  }
};

export type PeerEventHandler = (peerInfo: PeerInfo) => boolean;
