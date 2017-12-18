// ISC, Copyright 2017 Jaco Greeff
// @flow

require('./license.js');

const l = require('@polkadot/util/logger')('client');
const loadChain = require('@polkadot/client-chains/load');

const config = require('./cli')();
const initRpc = require('./rpc');
const initP2p = require('./p2p');
// const initState = require('./state');

l.log(`Initialising for roles=${config.roles.join(',')} on chain=${config.chain}`);

const chain = loadChain(config.chain);
// const state = initState(chain);

initP2p(config, chain);
initRpc(config);
