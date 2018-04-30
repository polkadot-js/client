// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { StorageDef$Section } from '@polkadot/db/types';

module.exports = ({
  balanceOf: {
    key: 'sta:bal:',
    params: {
      who: 'AccountId'
    },
    type: 'u64'
  },
  bondageOf: {
    key: 'sta:bon:',
    params: {
      who: 'AccountId'
    },
    type: 'u64'
  },
  bondingDuration: {
    key: 'sta:loc'
  },
  currentEra: {
    key: 'sta:era',
    type: 'u64'
  },
  intent: {
    key: 'sta:wil:',
    params: {
      index: 'u32'
    }
  },
  intentLength: {
    key: 'sta:wil:len',
    type: 'u32'
  },
  lastEraLengthChange: {
    key: 'sta:lec'
  },
  nextSessionsPerEra: {
    key: 'sta:nse'
  },
  sessionsPerEra: {
    key: 'sta:spe',
    type: 'u64'
  },
  validatorCount: {
    key: 'sta:vac',
    type: 'u64'
  }
}: StorageDef$Section);
