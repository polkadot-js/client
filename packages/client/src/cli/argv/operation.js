// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Options } from 'yargs';

const allRoles = require('@polkadot/primitives/role/all');
const chains = require('@polkadot/client-chains/chains');
const chainDefaults = require('@polkadot/client-chains/defaults');

const { clientId } = require('../../clientId');

const allChains = Object.keys(chains).map((chain) => `'${chain}'`);

module.exports = ({
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
    // flowlint-next-line unclear-type:off
    choices: ((Object.keys(allRoles): any): Array<mixed>),
    default: ['none'],
    description: 'Sets the type of roles the node operates as',
    type: 'array'
  }
}: { [key: string]: Options });
