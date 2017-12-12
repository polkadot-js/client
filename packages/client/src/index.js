// ISC, Copyright 2017 Jaco Greeff
// @flow

require('./license.js');

const l = require('@polkadot/util/logger')('client');
const loadChain = require('@polkadot/client-chains/load');

const config = require('./cli')();
const initRpc = require('./rpc');
const initP2p = require('./p2p');

l.log(`Initialising for role=${config.role} on chain=${config.chain}`);

const chain = loadChain(config.chain);

initP2p(config, chain);
initRpc(config);
