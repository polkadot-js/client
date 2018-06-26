// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Config } from '@polkadot/client/types';
import { ChainInterface } from '@polkadot/client-chains/types';
import { PeerState } from './types';

import BN from 'bn.js';
import E3 from 'eventemitter3';
import logger from '@polkadot/util/logger';

const l = logger('p2p/peer');

export default function state (config: Config, chain: ChainInterface): PeerState {
  return {
    bestHash: new Uint8Array([]),
    bestNumber: new BN(0),
    chain,
    config,
    emitter: new E3.EventEmitter(),
    l,
    nextId: 0
  };
}
