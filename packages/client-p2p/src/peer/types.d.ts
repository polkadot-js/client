// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import BN from 'bn.js';
import EventEmitter from 'eventemitter3';
import { Pushable } from 'pull-pushable';
import { Config } from '@polkadot/client/types';
import { ChainInterface } from '@polkadot/client-chains/types';
import { Logger } from '@polkadot/util/types';

export type PeerState = {
  bestHash: Uint8Array,
  bestNumber: BN,
  chain: ChainInterface,
  config: Config,
  emitter: EventEmitter,
  l: Logger,
  nextId: number,
  pushable?: Pushable
}
