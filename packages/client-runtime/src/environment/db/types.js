// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BaseDb } from '@polkadot/client-db-chain/types';
import type { Memory$Storage } from '@polkadot/client-db/memory/types';

export type DbState = {
  backend: BaseDb,
  pending: Memory$Storage
};
