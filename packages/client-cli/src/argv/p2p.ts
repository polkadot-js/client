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
  'p2p-discover-boot': {
    default: defaults.DISCOVER_BOOT_ENABLED,
    description: 'Discover nodes from the chain-specific bootnodes config (--no-p2p-discover-boot disables)',
    type: 'boolean'
  },
  'p2p-discover-star': {
    default: defaults.DISCOVER_STAR_ENABLED,
    description: 'Discover nodes via the WebSocket-star discovery mechanism (--no-p2p-discover-star disables)',
    type: 'boolean'
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
  }
} as { [index: string]: Options });
