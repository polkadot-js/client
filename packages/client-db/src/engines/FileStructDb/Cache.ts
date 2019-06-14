// Copyright 2017-2019 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { assert } from '@polkadot/util';

type CacheValue<T> = {
  key: T,
  next: CacheValue<T> | null,
  prev: CacheValue<T> | null,
  value: Uint8Array
};

export default class Cache<T> {
  private _cache = new Map<T, CacheValue<T>>();
  private _first: CacheValue<T>;
  private _last: CacheValue<T>;
  private _maxEntries: number;

  constructor (maxEntries: number) {
    assert(maxEntries >= 10, `Need a minimum of 10 entries, ${maxEntries} found`);

    this._maxEntries = maxEntries;

    this._first = { key: (Symbol() as any), next: null, prev: null, value: new Uint8Array() };
    this._last = { key: (Symbol() as any), next: null, prev: null, value: new Uint8Array() };

    this._first.next = this._last;
    this._last.prev = this._first;
  }

  // private _insertFirst (node: CacheValue): void {
  //   if (this._first === node) {
  //     return;
  //   }

  //   if (node.prev) {
  //     node.prev.next = node.next;
  //   }

  //   if (node.next) {
  //     node.next.prev = node.prev;
  //   }

  //   node.prev = null;
  //   node.next = this._first;

  //   this._first.prev = node;
  //   this._first = node;
  // }

  get (key: T): Uint8Array | null {
    const cached = this._cache.get(key);

    if (cached) {
      // this._insertFirst(cached);

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

    cached = { key, value, next: this._first, prev: null };

    this._cache.set(key, cached);
    this._first.prev = cached;
    this._first = cached;

    if (this._cache.size < this._maxEntries) {
      return;
    }

    this._cache.delete(this._last.key);

    // @ts-ignore Assume we always have at least a last entry (constructor)
    this._last = this._last.prev;
    this._last.next = null;
  }
}
