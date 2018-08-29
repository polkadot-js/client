// Copyright 2017-2018 @polkadot/client-chains authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Config } from '@polkadot/client/types';
import { ChainLoader } from '@polkadot/client-chains/types';
import { BlockDb, StateDb, ChainDbs } from './types';

import path from 'path';
import HashDiskDb from '@polkadot/client-db/Hash/Disk';
import HashMemoryDb from '@polkadot/client-db/Hash/Memory';
import TrieDiskDb from '@polkadot/client-db/Trie/Disk';
import TrieMemoryDb from '@polkadot/client-db/Trie/Memory';
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
        ? new HashDiskDb(path.join(dbPath, 'block'), db.compact)
        : new HashMemoryDb()
    );
    this.state = createStateDb(
      isDisk
        ? new TrieDiskDb(path.join(dbPath, 'state'), db.compact)
        : new TrieMemoryDb()
    );
  }

  async initialise (): Promise<void> {
    await this.blocks.db.initialise();
    await this.state.db.initialise();
  }
}
