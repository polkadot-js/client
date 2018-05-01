// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { StorageDef$Section } from '@polkadot/storage/types';

module.exports = ({
  approvalsOf: {
    description: 'Approvals for a specific account',
    key: 'gov:app:',
    params: {
      who: 'AccountId'
    },
    type: 'Bytes'
  },
  approvalsRatio: {
    description: 'The apprivals ratio',
    key: 'gov:apr',
    type: 'u32'
  },
  currentProposal: {
    description: 'The current proposal',
    key: 'gov:pro',
    type: 'Bytes'
  }
}: StorageDef$Section);
