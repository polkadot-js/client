// Copyright 2017-2019 @polkadot/client-cli authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Options } from 'yargs';

import defaults from '@polkadot/client-db/defaults';

export default ({
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
  'db-snapshot': {
    default: false,
    description: 'Create trie snapshot, drop & restore database from this',
    type: 'boolean'
  },
  'db-type': {
    choices: ['file', 'memory'],
    default: defaults.TYPE,
    description: 'The type of database type to use',
    type: 'string'
  }
} as { [index: string]: Options });
