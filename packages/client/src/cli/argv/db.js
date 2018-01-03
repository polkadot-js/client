// ISC, Copyright 2017-2018 Jaco Greeff
// @flow

import type { Options } from 'yargs';

const defaults = require('@polkadot/client-db/defaults');

module.exports = ({
  'db-path': {
    default: defaults.PATH,
    description: 'Sets the path for all storage operations',
    type: 'string'
  }
}: { [key: string]: Options });
