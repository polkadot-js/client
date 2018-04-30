// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { State$Definition$Section } from '@polkadot/db/types';

module.exports = ({
  bestHash: {
    key: 'bst:hsh'
  },
  bestNumber: {
    key: 'bst:num',
    type: 'u64'
  },
  blockByHash: {
    key: 'blk:hsh:'
  }
}: State$Definition$Section);
