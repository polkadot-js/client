// Copyright 2017-2019 @polkadot/client-cli authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Options } from 'yargs';

import defaults from '@polkadot/client-rpc/defaults';

const config: Record<string, Options> = {
  'rpc-active': {
    default: true,
    description: 'Controls the starting of the RPC server (--no-rpc-active disables)',
    type: 'boolean'
  },
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
};

export default config;
