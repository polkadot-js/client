// ISC, Copyright 2017 Jaco Greeff
// @flow

require('./license.js');

const l = require('@polkadot/util/logger')('client');

const config = require('./cli')();
const initRpc = require('./rpc');
const initP2p = require('./p2p');

l.log(`Initialising for role '${config.role}'`);

initP2p(config);
initRpc(config);
