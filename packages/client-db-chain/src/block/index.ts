// Copyright 2017-2018 @polkadot/client-db-chain authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { BaseDb } from '@polkadot/client-db/types';
import { BlockDb } from '../types';

import createBn from '../db/bn';
import createU8a from '../db/u8a';
import keys from './keys';

export default function blockDb (db: BaseDb): BlockDb {
  return {
    db,
    bestHash: createU8a(db, keys.public.bestHash),
    bestNumber: createBn(db, keys.public.bestNumber, 64),
    block: createU8a(db, keys.public.blockByHash),
    header: createU8a(db, keys.public.headerByHash)
  };
}
