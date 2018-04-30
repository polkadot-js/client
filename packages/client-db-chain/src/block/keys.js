// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { StorageDef$Section } from '@polkadot/storage/types';

module.exports = ({
  bestHash: {
    key: 'bst:hsh'
  },
  bestNumber: {
    key: 'bst:num',
    type: 'BlockNumber'
  },
  blockByHash: {
    key: 'blk:hsh:'
  }
}: StorageDef$Section);
