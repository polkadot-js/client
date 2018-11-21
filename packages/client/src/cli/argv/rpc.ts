// Copyright 2017-2018 @polkadot/client authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Options } from 'yargs';

import defaults from '@polkadot/client-rpc/defaults';

export default ({
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
} as { [index: string]: Options });
