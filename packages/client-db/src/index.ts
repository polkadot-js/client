// Copyright 2017-2019 @polkadot/client-chains authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Config } from '@polkadot/client/types';
import { ChainLoader } from '@polkadot/client-chains/types';
import { BlockDb, StateDb, ChainDbs, DbConfig } from './types';

import path from 'path';
import MemoryDb from '@polkadot/db/Memory';
import TrieDb from '@polkadot/trie-db';
import { u8aToHex } from '@polkadot/util';

import DiskDb from './DiskDb';
import createBlockDb from './block';
import createStateDb from './state';

const BDB_OPT = { isCompressed: false, isLru: false, isTrie: false };
const SDB_OPT = { isCompressed: false, isLru: false, isTrie: true };

export default class Dbs implements ChainDbs {
  public readonly blocks: BlockDb;

  public readonly state: StateDb;

  private basePath: string;

  private config: DbConfig;

  public constructor ({ db, sync }: Config, chain: ChainLoader) {
    this.config = db;
    this.basePath = db.type !== 'memory'
      ? path.join(db.path, 'chains', chain.id, u8aToHex(chain.genesisRoot), 'db')
      : '';
    const isMemory = this.config.type === 'memory';
    const isLight = sync === 'light';

    this.blocks = createBlockDb(
      isMemory
        ? new MemoryDb()
        : new DiskDb(this.basePath, isLight ? 'header' : 'block', BDB_OPT)
    );
    this.state = createStateDb(new TrieDb(
      isMemory || isLight
        ? new MemoryDb()
        : new DiskDb(this.basePath, 'state', SDB_OPT)
    ));

    this.blocks.db.open();
    this.state.db.open();
  }

  public close (): void {
    this.blocks.db.close();
    this.state.db.close();
  }
}
