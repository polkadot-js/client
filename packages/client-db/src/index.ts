// Copyright 2017-2018 @polkadot/client-chains authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { BaseDb, ProgressCb, ProgressValue } from '@polkadot/db/types';
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

const SPINNER = ['|', '/', '-', '\\'];
const PREPEND = '                                     ';

const l = logger('db');

export default class Dbs implements ChainDbs {
  readonly blocks: BlockDb;
  readonly state: StateDb;
  private stateBackup: StateDb | null;
  private basePath: string;

  constructor ({ db }: Config, chain: ChainLoader) {
    const isDisk = db.type === 'disk';
    this.basePath = isDisk
      ? path.join(db.path, 'chains', chain.id, u8aToHex(chain.genesisRoot))
      : '';

    this.blocks = createBlockDb(
      isDisk
        // NOTE blocks compress very well
        ? new DiskDb(this.basePath, 'block.db', { isCompressed: true })
        : new MemoryDb()
    );
    this.state = createStateDb(
      new TrieDb(
        isDisk
          // NOTE state RLP does not compress well here
          ? new DiskDb(this.basePath, 'state.db', { isCompressed: false })
          : new MemoryDb()
      )
    );
    this.stateBackup = db.snapshot
        ? createStateDb(
          new TrieDb(
            isDisk
              ? new DiskDb(this.basePath, 'state.db.snapshot', { isCompressed: false })
              : new MemoryDb()
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
