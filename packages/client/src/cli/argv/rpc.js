// ISC, Copyright 2017 Jaco Greeff
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
  }
}: { [key: string]: Options });
