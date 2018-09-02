// Copyright 2017-2018 @polkadot/client-chains authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Config } from '@polkadot/client/types';
import { ChainLoader } from '@polkadot/client-chains/types';
import { BlockDb, StateDb, ChainDbs } from './types';

import path from 'path';
import DiskDb from '@polkadot/db/Disk';
import MemoryDb from '@polkadot/db/Memory';
import TrieDb from '@polkadot/trie-db';
import u8aToHex from '@polkadot/util/u8a/toHex';

import createBlockDb from './block';
import createStateDb from './state';

export default class Dbs implements ChainDbs {
  readonly blocks: BlockDb;
  readonly state: StateDb;

  constructor ({ db }: Config, chain: ChainLoader) {
    const isDisk = db.type === 'disk';
    const dbPath = path.join(db.path, 'chains', chain.id, u8aToHex(chain.genesisRoot));

    this.blocks = createBlockDb(
      isDisk
        ? new DiskDb(dbPath, 'block.db')
        : new MemoryDb()
    );
    this.state = createStateDb(
      new TrieDb(
        isDisk
          ? new DiskDb(dbPath, 'state.db')
          : new MemoryDb()
      )
    );

    this.blocks.db.open();
    this.state.db.open();
  }
}
