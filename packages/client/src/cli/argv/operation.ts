// Copyright 2017-2018 @polkadot/client authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Options } from 'yargs';

import chains from '@polkadot/client-chains/chains';
import chainDefaults from '@polkadot/client-chains/defaults';

import { clientId } from '../../clientId';

const allChains = Object.keys(chains).map((chain) => `'${chain}'`);

export default ({
  'chain': {
    default: chainDefaults.MAIN,
    description: `Use the chain specified, one of ${allChains.join(', ')} or custom '<chain>.json'`,
    type: 'string'
  },
  'client-id': {
    default: clientId,
    description: 'The client/version identifier for the running node',
    type: 'string'
  },
  'roles': {
    choices: ['full', 'light'],
    default: ['full'],
    description: 'Sets the type of roles the node operates as',
    type: 'array'
  }
}: { [key: string]: Options });
