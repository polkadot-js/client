// Copyright 2017-2019 @polkadot/client-cli authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Options } from 'yargs';

import defaults from '@polkadot/client-wasm/defaults';

export default ({
  'wasm-heap-size': {
    default: defaults.HEAP_SIZE_KB,
    description: 'Initial size for the WASM runtime heap (KB)',
    type: 'number'
  }
} as { [index: string]: Options });
