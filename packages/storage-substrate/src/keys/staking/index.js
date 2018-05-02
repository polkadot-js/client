// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { StorageDef$Section } from '@polkadot/storage/types';

module.exports = ({
  keys: {
    balanceOf: {
      description: 'The balance of a given account',
      key: 'sta:bal:',
      params: {
        who: 'AccountId'
      },
      type: 'u64'
    },
    bondageOf: {
      key: 'sta:bon:',
      description: 'The block at which the account becomes liquid',
      params: {
        who: 'AccountId'
      },
      type: 'u64'
    },
    codeOf: {
      key: 'sta:cod:',
      description: 'The code associated with an account',
      params: {
        who: 'AccountId'
      },
      type: 'Bytes'
    },
    transactionFee: {
      description: 'The fee to be paid for making a transaction',
      key: 'sta:fee',
      type: 'u64'
    },
    bondingDuration: {
      description: 'The length of the bonding duration in eras',
      key: 'sta:loc',
      type: 'u64'
    },
    currentEra: {
      description: 'The current era index',
      key: 'sta:era',
      type: 'u64'
    },
    reservedBalanceOf: {
      description: 'The amount of a given account that is reserved',
      key: 'sta:lbo:',
      params: {
        who: 'AccountId'
      },
      type: 'u64'
    },
    intent: {
      description: 'All the accounts with a desire to stake',
      key: 'sta:wil:',
      params: {
        index: 'u32'
      },
      type: 'AccountId'
    },
    intentLength: {
      description: 'All the accounts with a desire to stake (length)',
      key: 'sta:wil:len',
      type: 'u32'
    },
    lastEraLengthChange: {
      description: 'The block number at which the era length last changed',
      key: 'sta:lec',
      type: 'BlockNumber'
    },
    nextSessionsPerEra: {
      description: 'The next value of sessions per era',
      key: 'sta:nse',
      type: 'u64'
    },
    sessionsPerEra: {
      description: 'The length of a staking era in sessions',
      key: 'sta:spe',
      type: 'u64'
    },
    storageOf: {
      description: 'The storage items associated with an account/key',
      key: 'sta:sto:',
      params: {
        who: 'AccountId'
      },
      type: 'Bytes'
    },
    totalAtStake: {
      description: 'The total amount of stake on the system',
      key: 'sta:tot',
      type: 'u64'
    },
    validatorCount: {
      description: 'The length of a staking era in sessions',
      key: 'sta:vac',
      type: 'u64'
    }
  }
}: StorageDef$Section);
