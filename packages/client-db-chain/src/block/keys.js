// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { StorageDef$Section } from '@polkadot/storage/types';

module.exports = ({
  keys: {
    bestHash: {
      description: 'Best hash',
      key: 'bst:hsh',
      type: 'Hash'
    },
    bestNumber: {
      description: 'Best block',
      key: 'bst:num',
      type: 'BlockNumber'
    },
    blockByHash: {
      description: 'Retrieve block by hash',
      params: {
        hash: 'Hash'
      },
      key: 'blk:hsh:',
      type: 'Bytes'
    }
  }
}: StorageDef$Section);
