// Copyright 2017-2019 @polkadot/client-www authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { ConfigPartial } from '@polkadot/client/types';

import defaultsP2p from '@polkadot/client-p2p/defaults';
import defaultsWasm from '@polkadot/client-wasm/defaults';

export default ({
  chain: 'alexander', // 'dried-danta',
  db: {
    compact: false,
    path: '.',
    type: 'memory'
  },
  p2p: {
    active: true,
    address: defaultsP2p.ADDRESS,
    discoverBoot: false,
    discoverStar: true,
    maxPeers: defaultsP2p.MAX_PEERS,
    nodes: [],
    port: defaultsP2p.PORT,
    type: 'browser'
  },
  rpc: null,
  signal: null,
  sync: 'light',
  telemetry: null,
  wasm: {
    heapSize: defaultsWasm.HEAP_SIZE_KB
  }
} as ConfigPartial);
