// ISC, Copyright 2017 Jaco Greeff
// @flow

require('./license.js');

const l = require('@polkadot/util/logger')('client');

const config = require('./cli')();
const initRpc = require('./rpc');
const initP2p = require('./p2p');
const initState = require('./state');

l.log(`Initialising for roles=${config.roles.join(',')} on chain=${config.chain}`);

const state = initState(config);

initP2p(state);
initRpc(state);
