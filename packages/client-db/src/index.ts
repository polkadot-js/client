// Copyright 2017-2019 @polkadot/client-chains authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { TxDb } from '@polkadot/db/types';
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

export default class Dbs implements ChainDbs {
  readonly blocks: BlockDb;
  readonly state: StateDb;
  private basePath: string;
  private config: DbConfig;

  constructor ({ db, sync }: Config, chain: ChainLoader) {
    this.config = db;
    this.basePath = db.type !== 'memory'
      ? path.join(db.path, 'chains', chain.id, u8aToHex(chain.genesisRoot), db.type)
      : '';
    const isMemory = this.config.type === 'memory';
    const isLight = sync === 'light';

    this.blocks = createBlockDb(
      this.createBackingDb(isLight ? 'header' : 'block', isMemory)
    );
    this.state = createStateDb(
      new TrieDb(
        this.createBackingDb('state', isMemory || isLight)
      )
    );

    this.blocks.db.open();
    this.state.db.open();
  }

  private createBackingDb (name: string, isMemory: boolean): TxDb {
    return isMemory
      ? new MemoryDb()
      : new DiskDb(this.basePath, name, { isCompressed: false, isLru: true });
  }

  close (): void {
    this.blocks.db.close();
    this.state.db.close();
  }
}
