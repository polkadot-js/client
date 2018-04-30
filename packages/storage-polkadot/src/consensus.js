// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { StorageDef$Section } from '@polkadot/storage/types';

module.exports = ({
  authority: {
    key: ':auth:',
    params: {
      index: 'u32'
    }
  },
  'authority(unhashed)': {
    isUnhashed: true,
    key: ':auth:',
    params: {
      index: 'u32'
    }
  },
  authorityCount: {
    isUnhashed: true,
    key: ':auth:len',
    type: 'u32'
  }
}: StorageDef$Section);
