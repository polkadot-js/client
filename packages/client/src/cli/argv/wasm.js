// Copyright 2017-2018 @polkadot/client authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Options } from 'yargs';

import defaults from '@polkadot/client-wasm/defaults';

export default ({
  'wasm-heap-size': {
    default: defaults.HEAP_SIZE_KB,
    description: 'Initial size for the WASM runtime heap (kB)',
    type: 'number'
  }
}: { [key: string]: Options });
