// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { StorageDef$Section } from '@polkadot/storage/types';

module.exports = ({
  approvalsOf: {
    key: 'gov:app:'
  },
  approvalsRatio: {
    key: 'gov:apr',
    type: 'u32'
  },
  currentProposal: {
    key: 'gov:pro'
  }
}: StorageDef$Section);
