// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Options } from 'yargs';

const defaults = require('@polkadot/client-rpc/defaults');

module.exports = ({
  'rpc-path': {
    default: defaults.PATH,
    description: 'Sets the endpoint for RPC POST requests',
    type: 'string'
  },
  'rpc-port': {
    default: defaults.PORT,
    description: 'Sets the port to use for local RPC',
    type: 'number'
  },
  'rpc-types': {
    default: defaults.TYPES,
    description: 'Sets the available RPC protocol types',
    type: 'array',
    choices: ['http', 'ws']
  }
}: { [key: string]: Options });
