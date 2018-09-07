// Copyright 2017-2018 @polkadot/client-chains authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { BaseDb, ProgressCb, ProgressValue, TxDb } from '@polkadot/db/types';
import { Config } from '@polkadot/client/types';
import { ChainLoader } from '@polkadot/client-chains/types';
import { BlockDb, StateDb, ChainDbs, DbConfig } from './types';

import path from 'path';
import DiskDb from '@polkadot/db/Disk';
import MemoryDb from '@polkadot/db/Memory';
import TrieDb from '@polkadot/trie-db';
import logger from '@polkadot/util/logger';
import u8aToHex from '@polkadot/util/u8a/toHex';

import createBlockDb from './block';
import createStateDb from './state';

const SPINNER = ['|', '/', '-', '\\'];
const PREPEND = '                                     ';

const l = logger('db');

export default class Dbs implements ChainDbs {
  readonly blocks: BlockDb;
  readonly state: StateDb;
  private stateBackup: StateDb | null;
  private basePath: string;

  constructor ({ db }: Config, chain: ChainLoader) {
    this.basePath = db.type === 'disk'
      ? path.join(db.path, 'chains', chain.id, u8aToHex(chain.genesisRoot))
      : '';

    // NOTE blocks compress very well
    this.blocks = createBlockDb(
      this.createBackingDb(db, 'block.db', true)
    );
    // NOTE state RLP does not compress well here
    this.state = createStateDb(
      new TrieDb(
        this.createBackingDb(db, 'state.db', false)
      )
    );
    this.stateBackup = db.snapshot
        ? createStateDb(
          new TrieDb(
            this.createBackingDb(db, 'state.db.snapshot', false)
          )
        )
        : null;

    if (db.compact) {
      this.maintain('block', this.blocks.db);
      this.maintain('state', this.state.db);
    }

    this.blocks.db.open();
    this.state.db.open();
  }

  private createBackingDb ({ type }: DbConfig, name: string, isCompressed: boolean): TxDb {
    return type === 'disk'
      ? new DiskDb(this.basePath, name, { isCompressed })
      : new MemoryDb();
  }

  private maintain (name: string, db: BaseDb): void {
    l.log(`compacting ${name} database`);

    db.maintain(this.createProgress());
  }

  snapshotState (): void {
    if (!this.stateBackup) {
      return;
    }

    this.stateBackup.db.open();
    this.state.db.snapshot(this.stateBackup.db, this.createProgress());

    this.state.db.close();
    this.state.db.rename(this.basePath, `state.db.backup-${Date.now()}`);

    this.stateBackup.db.close();
    this.stateBackup.db.rename(this.basePath, 'state.db');
    this.stateBackup.db.open();

    this.state.db = this.stateBackup.db;
  }

  private createProgress (): ProgressCb {
    let lastUpdate = 0;
    let spin = 0;

    return (progress: ProgressValue): void => {
      const now = Date.now();

      if ((now - lastUpdate) > 200) {
        const percent = `      ${progress.percent.toFixed(2)}`.slice(-6);
        const keys = progress.keys > 9999
          ? `${(progress.keys / 1000).toFixed(2)}k`
          : progress.keys;

        process.stdout.write(`${PREPEND}${SPINNER[spin % SPINNER.length]} ${percent}%, ${keys} keys\r`);

        lastUpdate = now;
        spin++;
      }
    };
  }
}
