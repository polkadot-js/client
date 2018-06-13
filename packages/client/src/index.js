// Copyright 2017-2018 @polkadot/client authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

require('./license.js');

const createChain = require('@polkadot/client-chains');
const memoryDb = require('@polkadot/util-triedb/temp');
const createP2p = require('@polkadot/client-p2p');
const l = require('@polkadot/util/logger')('client');

const clientId = require('./clientId');
const config = require('./cli')();
const initDev = require('./dev');
const createRpc = require('./rpc');

(async function main (): Promise<void> {
  const verStatus = await clientId.getNpmStatus();

  l.log(`Running version ${clientId.version} (${verStatus})`);
  l.log(`Initialising for roles=${config.roles.join(',')} on chain=${config.chain}`);

  const chain = createChain(config, memoryDb(), memoryDb());
  const p2p = createP2p(config, chain);
  const rpc = createRpc(config, chain);

  initDev(config, { chain, p2p, rpc });
})();
