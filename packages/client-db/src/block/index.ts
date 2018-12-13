// Copyright 2017-2018 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { BaseDb } from '@polkadot/db/types';
import { BlockDb } from '../types';

import createBn from '../db/bn';
import createU8a from '../db/u8a';
import keys from './keys';

export default function blockDb (db: BaseDb): BlockDb {
  return {
    db,
    bestHash: createU8a(db, keys.bestHash),
    bestNumber: createBn(db, keys.bestNumber, 64),
    blockData: createU8a(db, keys.blockByHash),
    header: createU8a(db, keys.headerByHash),
    hash: createU8a(db, keys.hashByNumber)
  };
}
