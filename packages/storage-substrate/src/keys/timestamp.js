// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { StorageDef$Section } from '@polkadot/storage/types';

module.exports = ({
  current: {
    description: 'The current timestamp',
    key: 'tim:val',
    type: 'u64'
  },
  didUpdate: {
    description: 'Did the timestamp update',
    key: 'tim:did',
    type: 'bool'
  }
}: StorageDef$Section);