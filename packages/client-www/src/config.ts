// Copyright 2017-2019 @polkadot/client-www authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Config } from '@polkadot/client/types';

import defaultsP2p from '@polkadot/client-p2p/defaults';
import defaultsRpc from '@polkadot/client-rpc/defaults';
import defaultsTelemetry from '@polkadot/client-telemetry/defaults';
import defaultsWasm from '@polkadot/client-wasm/defaults';

export default ({
  chain: 'dried-danta',
  db: {
    compact: false,
    path: '.',
    snapshot: false,
    type: 'memory'
  },
  p2p: {
    address: defaultsP2p.ADDRESS,
    maxPeers: defaultsP2p.MAX_PEERS,
    nodes: [],
    port: defaultsP2p.PORT,
    type: 'browser'
  },
  roles: ['full'],
  rpc: {
    path: defaultsRpc.PATH,
    port: defaultsRpc.PORT,
    types: []
  },
  telemetry: {
    name: '',
    url: defaultsTelemetry.URL
  },
  wasm: {
    heapSize: defaultsWasm.HEAP_SIZE_KB
  }
} as Config);
