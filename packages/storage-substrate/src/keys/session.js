// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { StorageDef$Section } from '@polkadot/storage/types';

module.exports = ({
  keys: {
    currentIndex: {
      description: 'Current index of the session',
      key: 'ses:ind',
      type: 'BlockNumber'
    },
    lastSessionChange: {
      description: 'Block at which the session length last changed',
      key: 'ses:llc',
      type: 'BlockNumber'
    },
    nextKeyFor: {
      description: 'The next key for a given validator',
      key: 'ses:nxt:',
      params: {
        who: 'AccountId'
      },
      type: 'Bytes'
    },
    nextLength: {
      description: 'The next session length',
      key: 'ses:nln',
      type: 'BlockNumber'
    },
    length: {
      description: 'Current length of the session',
      key: 'ses:len',
      type: 'BlockNumber'
    },
    validator: {
      description: 'The validator at a specific index',
      key: 'ses:val:',
      params: {
        index: 'u32'
      },
      type: 'AccountId'
    },
    validatorCount: {
      description: 'The number of validators',
      key: 'ses:val:len',
      type: 'u32'
    }
  }
}: StorageDef$Section);
