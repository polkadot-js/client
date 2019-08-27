// Copyright 2017-2019 @polkadot/client-cli authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Options } from 'yargs';

import defaults from '@polkadot/client-db/defaults';

const config: Record<string, Options> = {
  'db-compact': {
    default: false,
    description: 'Compact existing databases',
    type: 'boolean'
  },
  'db-path': {
    default: defaults.PATH,
    description: 'Sets the path for all storage operations',
    type: 'string'
  },
  'db-type': {
    choices: ['file', 'memory'],
    default: defaults.TYPE,
    description: 'The type of database type to use',
    type: 'string'
  }
};

export default config;
