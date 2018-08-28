// Copyright 2017-2018 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { BaseDb, DbConfig$Type } from '../types';

import SyncDb from '../Sync';

export default class HashBaseDb implements BaseDb {
  private wrapped: BaseDb;

  constructor (type: DbConfig$Type = 'memory', path: string = '.', withCompact: boolean = false) {
    this.wrapped = new SyncDb(type, path, false, withCompact);
  }

  initialise (): Promise<void> {
    return this.wrapped.initialise();
  }

  del (key: Uint8Array): void {
    this.wrapped.del(key);
  }

  get (key: Uint8Array): Uint8Array | null {
    return this.wrapped.get(key);
  }

  put (key: Uint8Array, value: Uint8Array): void {
    this.wrapped.put(key, value);
  }

  terminate () {
    return this.wrapped.terminate();
  }
}
