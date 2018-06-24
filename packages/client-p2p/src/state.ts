// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Config } from '@polkadot/client/types';
import { ChainInterface } from '@polkadot/client-chains/types';
import { Logger } from '@polkadot/util/types';
import { P2pState } from './types';

import EventEmitter from 'eventemitter3';

import syncState from './sync/state';

export default function state (l: Logger, config: Config, chain: ChainInterface): P2pState {
  return {
    chain,
    config,
    emitter: new EventEmitter(),
    l,
    node: null,
    peers: null,
    sync: syncState()
  };
}
