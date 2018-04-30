// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { StorageDef$Section } from '@polkadot/db/types';

module.exports = ({
  blockHashAt: {
    key: 'sys:old:',
    params: {
      blockNumber: 'BlockNumber'
    }
  },
  code: {
    isUnhashed: true,
    key: ':code'
  },
  nonceOf: {
    key: 'sys:non:',
    params: {
      who: 'AccountId'
    },
    type: 'u64'
  },
  tempTransactionNumber: {
    key: 'temp:txcount:'
  }
}: StorageDef$Section);
