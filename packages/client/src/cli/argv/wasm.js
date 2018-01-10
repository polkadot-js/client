// ISC, Copyright 2017-2018 Jaco Greeff
// @flow

import type { Options } from 'yargs';

const defaults = require('@polkadot/client-wasm/defaults');

module.exports = ({
  'wasm-memory-initial': {
    default: defaults.HEAP_SIZE_MB,
    description: 'Initial size for the WASM runtime (MB)',
    type: 'number'
  },
  'wasm-memory-maximum': {
    default: defaults.HEAP_SIZE_MB,
    description: 'Maxiumum size for the WASM runtime (MB)',
    type: 'number'
  }
}: { [key: string]: Options });
