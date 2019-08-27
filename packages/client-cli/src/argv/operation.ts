// Copyright 2017-2019 @polkadot/client-cli authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Options } from 'yargs';
import { SyncTypes } from '@polkadot/client-sync/types';

import chains from '@polkadot/client-chains/chains';
import { clientId } from '@polkadot/client/clientId';
import syncDefaults from '@polkadot/client-sync/defaults';

const allChains = Object.keys(chains).map((chain): string => `'${chain}'`);

const config: Record<string, Options> = {
  chain: {
    description: `Use the chain specified, one of ${allChains.join(', ')} or custom '<chain>.json'`,
    required: true,
    type: 'string'
  },
  'client-id': {
    default: clientId,
    description: 'The client/version identifier for the running node',
    type: 'string'
  },
  sync: {
    choices: ['full', 'light'] as SyncTypes[],
    default: syncDefaults.SYNC_DEFAULT,
    description: 'Sets the sync type full (state validation) or light (header valiation)',
    type: 'string'
  }
};

export default config;
