// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { P2pState } from '../types';
import { PeersState } from './types';

import E3 from 'eventemitter3';
import logger from '@polkadot/util/logger';

const l = logger('p2p/peers');

export default function createState ({ chain, config }: P2pState): PeersState {
  return {
    chain,
    config,
    emitter: new E3.EventEmitter(),
    l,
    peers: {}
  };
}
