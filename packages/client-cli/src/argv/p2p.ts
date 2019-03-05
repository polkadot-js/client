// Copyright 2017-2019 @polkadot/client-cli authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Options } from 'yargs';

import defaults from '@polkadot/client-p2p/defaults';

export default ({
  'p2p-address': {
    default: defaults.ADDRESS,
    description: 'The interface to bind to (p2p-port > 0)',
    type: 'string'
  },
  'p2p-max-peers': {
    default: defaults.MAX_PEERS,
    description: 'The maximum allowed peers',
    type: 'number'
  },
  'p2p-nodes': {
    default: [],
    description: 'Reserved nodes to make initial connections to',
    type: 'array'
  },
  'p2p-port': {
    default: defaults.PORT,
    description: 'Sets the peer-to-peer port, 0 for non-listening mode',
    type: 'number'
  },
  'p2p-no-bootnodes': {
    default: false,
    description: 'When specified, do not make connections to chain-specific bootnodes',
    type: 'boolean'
  }
} as { [index: string]: Options });
