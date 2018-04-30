// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { State$Definition$Section } from '@polkadot/db/types';

module.exports = ({
  blockHashAt: {
    key: 'sys:old:',
    params: ['u64']
  },
  code: {
    isUnhashed: true,
    key: ':code'
  },
  nonceOf: {
    key: 'sys:non:',
    params: ['AccountId'],
    type: 'u64'
  },
  tempTransactionNumber: {
    key: 'temp:txcount:'
  }
}: State$Definition$Section);
