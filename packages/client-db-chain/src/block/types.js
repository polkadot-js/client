// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { State$Method } from '@polkadot/db/types';

export type ChainDb$Block = {
  bestHash: State$Method,
  bestNumber: State$Method,
  block: State$Method
};
