// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Options } from 'yargs';

const defaults = require('@polkadot/client-db/defaults');

module.exports = ({
  'db-path': {
    default: defaults.PATH,
    description: 'Sets the path for all storage operations',
    type: 'string'
  },
  'db-type': {
    choices: ['disk', 'memory'],
    default: defaults.TYPE,
    description: 'The type of database storage to use',
    type: 'string'
  }
}: { [key: string]: Options });
