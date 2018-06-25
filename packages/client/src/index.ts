// Copyright 2017-2018 @polkadot/client authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import './license';

import createChain from '@polkadot/client-chains/index';
import memoryDb from '@polkadot/util-triedb/temp';
import createP2p from '@polkadot/client-p2p/index';
import logger from '@polkadot/util/logger';

import * as clientId from './clientId';
import cli from './cli';
import initDev from './dev';
import createRpc from './rpc';

const l = logger('client');
const config = cli();

(async function main (): Promise<void> {
  const verStatus = await clientId.getNpmStatus();

  l.log(`Running version ${clientId.version} (${verStatus})`);
  l.log(`Initialising for roles=${config.roles.join(',')} on chain=${config.chain}`);

  const chain = createChain(config, memoryDb(), memoryDb());
  const p2p = createP2p(config, chain);
  const rpc = createRpc(config, chain);

  initDev(config, { chain, p2p, rpc });
})();
