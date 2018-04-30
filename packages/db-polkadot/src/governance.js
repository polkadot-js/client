// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { State$Definition$Section } from '@polkadot/db/types';

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
}: State$Definition$Section);
