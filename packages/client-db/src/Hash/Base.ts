// Copyright 2017-2018 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { AsyncBaseDb } from '../types';

// @ts-ignore needs typings
import levelup from 'levelup';
import encoder from '@polkadot/trie-db/encoder';

export default class HashBaseDb implements AsyncBaseDb {
  private db: any;

  constructor (backing: any) {
    this.db = levelup(
      encoder(backing)
    );
  }

  async del (key: Uint8Array): Promise<void> {
    await this.db.del(key);
  }

  async get (key: Uint8Array): Promise<Uint8Array | null> {
    const value = await this.db.get(key);

    return value;
  }

  async put (key: Uint8Array, value: Uint8Array): Promise<void> {
    await this.db.put(key);
  }
}
