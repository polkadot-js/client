// Copyright 2017-2019 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { assert } from '@polkadot/util';

type CacheValue = {
  key: number,
  prev: CacheValue | null,
  value: Uint8Array
};

export default class Cache {
  private _cache: Map<number, CacheValue> = new Map();
  private _first: CacheValue;
  private _last: CacheValue;
  private _maxEntries: number;

  constructor (maxEntries: number) {
    assert(maxEntries >= 10, `Need a minimum of 10 entries, ${maxEntries} found`);

    this._maxEntries = maxEntries;

    this._first = { key: 123.456, prev: null, value: new Uint8Array() };
    this._last = { key: 987.654, prev: this._first, value: new Uint8Array() };
  }

  get (key: number): Uint8Array | null {
    const cached = this._cache.get(key);

    // for now, we are not doing LRU-y stuff
    if (cached) {
      return cached.value;
    }

    return null;
  }

  set (key: number, value: Uint8Array): void {
    let cached = this._cache.get(key);

    if (cached) {
      cached.value = value;
      return;
    }

    cached = { key, value, prev: null };

    this._cache.set(key, cached);
    this._first.prev = cached;
    this._first = cached;

    if (this._cache.size < this._maxEntries) {
      return;
    }

    this._cache.delete(this._last.key);

    // @ts-ignore Assume we always have at least a last entry (constructor)
    this._last = this._last.prev;
  }
}
