// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { StorageMethod, WrapDb } from '@polkadot/storage/types';

export type ChainDb$Block = {
  db: WrapDb,
  bestHash: StorageMethod,
  bestNumber: StorageMethod,
  block: StorageMethod
};
