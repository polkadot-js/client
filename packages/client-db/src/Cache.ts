// Copyright 2017-2018 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { LRUMap } from 'lru_map';
// import logger from '@polkadot/util/logger';

type CacheObject = {
  [index: string]: Uint8Array | null | undefined
};

const LRU_SIZE = 16384;

// const l = logger('db/cache');

export default class Cache {
  // NOTE We are using 2 caches here -
  //  - cache: only available for the current block (also has 'null' for deleted items)
  //  - lru: longer-term accross cache that are used across blocks
  private cache: CacheObject;
  private lru: LRUMap<string, Uint8Array | null | undefined>;

  constructor () {
    this.cache = {};
    this.lru = new LRUMap(LRU_SIZE);
  }

  protected clearCache (): void {
    this.cache = {};
  }

  protected getCache (key: Uint8Array): Uint8Array | null | undefined {
    const keyStr = key.toString();
    const result = this.lru.get(keyStr) || this.cache[keyStr];

    this.cache[keyStr] = result;

    return result;
  }

  protected putCache (key: Uint8Array, value: Uint8Array | null | undefined): void {
    const keyStr = key.toString();

    this.lru.set(
      keyStr,
      this.cache[keyStr] = value
        ? value.slice()
        : value
    );
  }
}
