// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const BN = require('bn.js');

const config = require('../config');
const code = require('../wasm/demo_genesis_wasm');

const GOD_KEY = '0x3d866ec8a9190c8343c2fc593d21d8a6d0c5c4763aaab2349de3a6111d64d124';

module.exports = config({
  name: 'Demo',
  description: 'The Subtrate-Demo network.',
  type: 'substrate',
  blockTime: 5,
  networkId: '0x11',
  genesis: {
    authorities: [
      GOD_KEY
    ],
    balances: {
      [GOD_KEY]: new BN(1).iushln(63)
    },
    code,
    params: {
      bondingDuration: 90,
      candidacyBond: 1000,
      carryCount: 24,
      cooloffPeriod: 90 * 120 * 24,
      councilElectionVotingPeriod: 7 * 120 * 24,
      councilTermDuration: 180 * 120 * 24,
      councilProposalVotingPeriod: 7 * 120 * 24,
      desiredSeats: 0,
      inactiveGracePeriod: 1,
      launchPeriod: 120 * 24 * 14,
      minimumDeposit: 1000,
      presentationDuration: 120 * 24,
      presentSlashPerVoter: 1,
      sessionLength: 720,
      sessionsPerEra: 24,
      voterBond: 100,
      votingPeriod: 120 * 24 * 28
    },
    validators: [
      GOD_KEY
    ]
  },
  nodes: []
});
