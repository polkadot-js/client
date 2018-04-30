// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { StorageDef$Section } from '@polkadot/db/types';

module.exports = ({
  currentIndex: {
    key: 'ses:ind'
  },
  lastSessionChange: {
    key: 'ses:llc'
  },
  nextKeyFor: {
    key: 'ses:nxt:'
  },
  nextLength: {
    key: 'ses:nln',
    type: 'u64'
  },
  length: {
    key: 'ses:len',
    type: 'u64'
  },
  value: {
    key: 'ses:val:',
    params: {
      index: 'u32'
    }
  },
  valueCount: {
    key: 'ses:val:len',
    type: 'u32'
  }
}: StorageDef$Section);
