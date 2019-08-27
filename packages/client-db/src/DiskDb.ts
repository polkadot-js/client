// Copyright 2017-2019 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { DiskDbOptions } from './types';

import LruDb from '@polkadot/db/engines/LruDb';
import TransactionDb from '@polkadot/db/engines/TransactionDb';

import StructDb from './engines/FileStructDb';

const LRU_SIZE = 8 * 1024;

export default class DiskDb extends TransactionDb {
  public constructor (base: string, name: string, options: DiskDbOptions) {
    const backing = new StructDb(base, name, options);

    super(
      options.isLru
        ? new LruDb(backing, LRU_SIZE)
        : backing
    );
  }
}
