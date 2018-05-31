// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { StorageMethod$Bn, StorageMethod$U8a, WrappedDb } from '../types';

export type BlockDb = WrappedDb<{
  bestHash: StorageMethod$U8a,
  bestNumber: StorageMethod$Bn,
  block: StorageMethod$U8a
}>;
