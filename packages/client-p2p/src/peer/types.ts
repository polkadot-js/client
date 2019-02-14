// Copyright 2017-2019 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import EventEmitter from 'eventemitter3';
import { Pushable } from 'pull-pushable';
import { Config } from '@polkadot/client/types';
import { ChainInterface } from '@polkadot/client-chains/types';
import { Logger } from '@polkadot/util/types';

export type PeerState = {
  chain: ChainInterface,
  config: Config,
  emitter: EventEmitter,
  l: Logger,
  nextId: number,
  pushable?: Pushable
};
