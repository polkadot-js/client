// Copyright 2017-2018 @polkadot/client authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import './license';

import createChain from '@polkadot/client-chains/index';
import createP2p from '@polkadot/client-p2p/index';
import telemetry from '@polkadot/client-telemetry/index';
import logger from '@polkadot/util/logger';
import HashDb from '@polkadot/client-db/Hash';
import MemoryDb from '@polkadot/client-db/Memory';

import * as clientId from './clientId';
import cli from './cli';
import createRpc from './rpc';

const l = logger('client');
const config = cli();

// tslint:disable-next-line
(async function main (): Promise<void> {
  const verStatus = await clientId.getNpmStatus();

  l.log(`Running version ${clientId.version} (${verStatus})`);
  l.log(`Initialising for roles=${config.roles.join(',')} on chain=${config.chain}`);

  const chain = createChain(config, new MemoryDb(), new HashDb());

  telemetry.init(config, chain);

  createP2p(config, chain);
  createRpc(config, chain);
})();
