// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ChainConfigLoose } from '../types';

const BN = require('bn.js');

const code = require('../wasm/polkadot_runtime_wasm');

const GOD_KEY = '0x3d866ec8a9190c8343c2fc593d21d8a6d0c5c4763aaab2349de3a6111d64d124';

module.exports = ({
  name: 'Nelson',
  type: 'polkadot',
  description: 'An initial @polkadot/client test network. Will be deprecated once the @polkadot/client aligns with the official implementations in terms of networking and features.',
  authorities: [
    GOD_KEY
  ],
  balances: {
    [GOD_KEY]: new BN(1).iushln(63)
  },
  code,
  nodes: [],
  params: {
    approvalRatio: 667,
    blockTime: 5,
    bondingDuration: 90,
    networkId: '0x6f',
    sessionLength: 720,
    sessionsPerEra: 24
  },
  validators: [
    GOD_KEY
  ]
}: ChainConfigLoose);
