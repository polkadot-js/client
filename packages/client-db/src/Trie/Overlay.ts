// Copyright 2017-2018 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { TrieDb } from '../types';

import isUndefined from '@polkadot/util/is/undefined';
import logger from '@polkadot/util/logger';
import u8aToHex from '@polkadot/util/u8a/toHex';

type Cache = {
  [index: string]: Uint8Array | null
};

const l = logger('db/overlay');

export default class OverlayDb implements TrieDb {
  private cache: Cache;
  private wrapped: TrieDb;

  constructor (wrapped: TrieDb) {
    this.cache = {};
    this.wrapped = wrapped;
  }

  initialise (): Promise<void> {
    return this.wrapped.initialise();
  }

  checkpoint () {
    l.debug(() => ['checkpoint at', u8aToHex(this.getRoot())]);

    this.wrapped.checkpoint();
  }

  commit () {
    this.wrapped.commit();

    l.debug(() => ['committed at', u8aToHex(this.getRoot())]);
  }

  revert () {
    this.cache = {};
    this.wrapped.revert();

    l.debug(() => ['reverted to', u8aToHex(this.getRoot())]);
  }

  del (key: Uint8Array): void {
    this.cache[key.toString()] = null;

    return this.wrapped.del(key);
  }

  get (key: Uint8Array): Uint8Array | null {
    const keyStr = key.toString();

    if (!isUndefined(this.cache[keyStr])) {
      return this.cache[keyStr];
    }

    const result = this.wrapped.get(key);

    this.cache[keyStr] = result;

    return result;
  }

  put (key: Uint8Array, value: Uint8Array): void {
    this.cache[key.toString()] = value.slice();

    return this.wrapped.put(key, value);
  }

  getRoot (): Uint8Array {
    return this.wrapped.getRoot();
  }

  setRoot (value: Uint8Array): void {
    return this.wrapped.setRoot(value);
  }

  terminate () {
    return this.wrapped.terminate();
  }
}
