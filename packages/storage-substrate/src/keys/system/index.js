// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { StorageDef$Section } from '@polkadot/storage/types';

module.exports = ({
  keys: {
    blockHashAt: {
      description: 'The blockHash for a specific number',
      key: 'sys:old:',
      params: {
        blockNumber: 'BlockNumber'
      },
      type: 'Hash'
    },
    blockNumber: {
      description: 'The current block number being processed',
      key: 'sys:num',
      type: 'BlockNumber'
    },
    digest: {
      description: 'The digest for the current block',
      key: 'sys:dig',
      type: 'Digest'
    },
    extrinsicData: {
      description: 'The data associated with an extrinsic',
      key: 'sys:xtd',
      params: {
        extrinsic: 'u32'
      },
      type: 'Bytes'
    },
    extrinsicIndex: {
      description: 'The extrinsics index',
      key: 'sys:xti',
      type: 'u32'
    },
    extrinsicsRoot: {
      description: 'The extrinsicsRoot for the current block',
      key: 'sys:txr',
      type: 'Hash'
    },
    nonceOf: {
      description: 'The index of the given account',
      key: 'sys:non',
      params: {
        who: 'AccountId'
      },
      type: 'u64'
    },
    parentHash: {
      description: 'The parentHash for the current block',
      key: 'sys:pha',
      type: 'Hash'
    },
    randomSeed: {
      description: 'The random seed',
      key: 'sys:rnd',
      type: 'Hash'
    }
  }
}: StorageDef$Section);
