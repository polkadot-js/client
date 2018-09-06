// Copyright 2017-2018 @polkadot/client-chains authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { BaseDb } from '@polkadot/db/types';
import { Config } from '@polkadot/client/types';
import { ChainLoader } from '@polkadot/client-chains/types';
import { BlockDb, StateDb, ChainDbs } from './types';

import path from 'path';
import DiskDb from '@polkadot/db/Disk';
import MemoryDb from '@polkadot/db/Memory';
import TrieDb from '@polkadot/trie-db';
import logger from '@polkadot/util/logger';
import u8aToHex from '@polkadot/util/u8a/toHex';

import createBlockDb from './block';
import createStateDb from './state';
import createProgress from './progress';

const l = logger('db');

export default class Dbs implements ChainDbs {
  readonly blocks: BlockDb;
  readonly state: StateDb;

  constructor ({ db }: Config, chain: ChainLoader) {
    const isDisk = db.type === 'disk';
    const dbPath = isDisk
      ? path.join(db.path, 'chains', chain.id, u8aToHex(chain.genesisRoot))
      : '';

    this.blocks = createBlockDb(
      isDisk
        // NOTE blocks compress very well
        ? new DiskDb(dbPath, 'block.db', { isCompressed: true })
        : new MemoryDb()
    );
    this.state = createStateDb(
      new TrieDb(
        isDisk
          // NOTE state RLP does not compress well here
          ? new DiskDb(dbPath, 'state.db', { isCompressed: false })
          : new MemoryDb()
      )
    );

    if (db.compact) {
      this.maintain('block', this.blocks.db);
      this.maintain('state', this.state.db);
    }

    this.blocks.db.open();
    this.state.db.open();
  }

  private maintain (name: string, db: BaseDb): void {
    l.log(`compacting ${name} database`);

    db.maintain(createProgress());
  }
}
