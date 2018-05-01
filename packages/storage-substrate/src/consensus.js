// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { StorageDef$Section } from '@polkadot/storage/types';

module.exports = ({
  authority: {
    description: 'Authority by index',
    key: ':auth:',
    params: {
      index: 'u32'
    },
    type: 'AccountId'
  },
  'authority(unhashed)': {
    description: 'Authority by index (unhashed key entry)',
    isUnhashed: true,
    key: ':auth:',
    params: {
      index: 'u32'
    },
    type: 'AccountId'
  },
  authorityCount: {
    description: 'The number of authorities',
    isUnhashed: true,
    key: ':auth:len',
    type: 'u32'
  },
  code: {
    description: 'The current runtime code',
    isUnhashed: true,
    key: ':code',
    type: 'Hash'
  }
}: StorageDef$Section);
