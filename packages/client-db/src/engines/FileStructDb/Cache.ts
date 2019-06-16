// Copyright 2017-2019 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { assert } from '@polkadot/util';

type CacheValue = {
  value: Uint8Array
};

export default class Cache<T> {
  private _cache = new Map<T, CacheValue>();
  private _maxEntries: number;

  constructor (maxEntries: number) {
    assert(maxEntries >= 10, `Need a minimum of 10 entries, ${maxEntries} found`);

    this._maxEntries = maxEntries;
  }

  get (key: T): Uint8Array | null {
    const cached = this._cache.get(key);

    if (cached) {
      return cached.value;
    }

    return null;
  }

  set (key: T, value: Uint8Array): void {
    let cached = this._cache.get(key);

    if (cached) {
      cached.value = value;
      return;
    }

    if (this._cache.size > this._maxEntries) {
      this._cache.clear();
    }

    this._cache.set(key, { value });
  }
}
