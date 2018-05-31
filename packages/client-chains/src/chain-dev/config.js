// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ChainConfig, ChainConfig$Genesis$Block } from '../types';

const BN = require('bn.js');

const blake2AsU8a = require('@polkadot/util-crypto/blake2/asU8a');
const keyring = require('@polkadot/util-keyring/testingPairs')();

const code = require('../wasm/polkadot_runtime_wasm');
const codeHash = blake2AsU8a(code, 256);

const authorities = [ keyring.alice.publicKey() ];
const endowed = authorities.concat([ keyring.bob.publicKey(), keyring.charlie.publicKey(), keyring.dave.publicKey(), keyring.eve.publicKey(), keyring.ferdie.publicKey() ]);

module.exports = ({
  name: 'Development',
  description: 'An initial @polkadot/client development network. Network follows the Rust implementation config for the development chain.',
  type: 'polkadot',
  blockTime: 5,
  code,
  codeHash,
  networkId: 12345,
  genesis: {
    block: ({
      // NOTE: will be filled in by the genesis execution
    }: $Shape<ChainConfig$Genesis$Block>),
    consensus: {
      authorities,
      code
    },
    council: {
      activeCouncil: authorities.map((accountId) => ({
        accountId,
        duration: 1000000
      })),
      candidacyBond: 10,
      carryCount: 4,
      desiredSeats: endowed.length - authorities.length,
      inactiveGracePeriod: 1,
      presentationDuration: 10,
      presentSlashPerVoter: 1,
      termDuration: 1000000,
      votingBond: 2,
      votingPeriod: 20
    },
    councilVoting: {
      cooloffPeriod: 75,
      votingPeriod: 20
    },
    democracy: {
      launchPeriod: 9,
      minimumDeposit: 10,
      votingPeriod: 18
    },
    session: {
      validators: authorities,
      length: 10
    },
    staking: {
      bondingDuration: 2,
      balances: endowed.map((accountId) => ({
        accountId,
        balance: new BN(1).iushln(60)
      })),
      currentEra: 0,
      intentions: authorities,
      sessionsPerEra: 5,
      transactionFee: 1,
      validatorCount: 2
    }
  },
  nodes: []
}: ChainConfig);
