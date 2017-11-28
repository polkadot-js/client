// ISC, Copyright 2017 Jaco Greeff
// @flow

require('./license.js');

const l = require('@polkadot/util/logger')('client');

const config = require('./cli')();
const initRpc = require('./rpc');
const initP2p = require('./p2p');

console.log('config', config);

l.log(`Initialising for type=${config.type}`);

initP2p(config.p2p);
initRpc(config.rpc);
