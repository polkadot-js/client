// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

require('./license.js');

const memoryDb = require('@polkadot/client-db/memory');
const l = require('@polkadot/util/logger')('client');

const clientId = require('./clientId');
const config = require('./cli')();
const createChain = require('./create/chain');
const createRpc = require('./create/rpc');
const createP2p = require('./create/p2p');
const initDev = require('./dev');

(async function main (): Promise<void> {
  const verStatus = await clientId.getNpmStatus();

  l.log(`Running version ${clientId.version} (${verStatus})`);
  l.log(`Initialising for roles=${config.roles.join(',')} on chain=${config.chain}`);

  const chain = createChain(config, memoryDb(), memoryDb());
  const p2p = createP2p(config, chain);
  const rpc = createRpc(config, chain);

  initDev(config, { chain, p2p, rpc });
})();
