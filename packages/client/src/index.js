// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

require('./license.js');

const loadChain = require('@polkadot/client-chains/load');
const l = require('@polkadot/util/logger')('client');

const config = require('./cli')();
const createRpc = require('./create/rpc');
const createP2p = require('./create/p2p');
const createState = require('./create/state');

l.log(`Initialising for roles=${config.roles.join(',')} on chain=${config.chain}`);

const chain = loadChain(config.chain);
const state = createState(config, chain);

createP2p(config, state);
createRpc(config, state);
