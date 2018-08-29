// Copyright 2017-2018 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { LRUMap } from 'lru_map';

// type DeletedCache = {
//   [index: string]: boolean
// };

const LRU_SIZE = 256; // 128;

export default class Cache {
  // available for the current block in-progress deleted items
  // private nil: DeletedCache;
  // longer-term limited LRU cache that are used across blocks
  private lru: LRUMap<string, Uint8Array>;

  constructor () {
    // this.nil = {};
    this.lru = new LRUMap(LRU_SIZE);
  }

  protected clearCache (clearLru: boolean): void {
    // this.nil = {};

    if (clearLru) {
      this.lru.clear();
    }
  }

  protected delCache (key: Uint8Array): void {
    const keyStr = key.toString();

    this.lru.delete(keyStr);
    // this.nil[keyStr] = true;
  }

  protected getCache (key: Uint8Array): Uint8Array | null | undefined {
    const keyStr = key.toString();

    // if (this.nil[keyStr]) {
    //   return null;
    // }

    return this.lru.get(keyStr);
  }

  protected putCache (key: Uint8Array, value: Uint8Array): void {
    const keyStr = key.toString();

    // delete this.nil[keyStr];
    this.lru.set(keyStr, value.slice());
  }
}
