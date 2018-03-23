// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const BN = require('bn.js');

const config = require('../config');
const code = require('../wasm/polkadot_runtime_wasm');

const GOD_KEY = '0x3d866ec8a9190c8343c2fc593d21d8a6d0c5c4763aaab2349de3a6111d64d124';

module.exports = config({
  name: 'Nelson',
  description: 'An initial @polkadot/client test network. Will be deprecated once the @polkadot/client aligns with the official implementations in terms of networking and features.',
  type: 'polkadot',
  blockTime: 5,
  networkId: '0x6f',
  genesis: {
    authorities: [
      GOD_KEY
    ],
    balances: {
      [GOD_KEY]: new BN(1).iushln(63)
    },
    code,
    params: {
      approvalRatio: 667,
      bondingDuration: 90,
      sessionLength: 720,
      sessionsPerEra: 24
    },
    validators: [
      GOD_KEY
    ]
  },
  nodes: []
});
