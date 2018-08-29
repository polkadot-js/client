// Copyright 2017-2018 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { TrieDb } from '../types';

import isUndefined from '@polkadot/util/is/undefined';

import Cache from '../Cache';

export default class Base extends Cache {
  protected wrapped: TrieDb;

  constructor (wrapped: TrieDb) {
    super();

    this.wrapped = wrapped;
  }

  initialise (): Promise<void> {
    return this.wrapped.initialise();
  }

  del (key: Uint8Array): void {
    this.delCache(key);

    return this.wrapped.del(key);
  }

  get (key: Uint8Array): Uint8Array | null {
    let result = this.getCache(key);

    if (!isUndefined(result)) {
      return result;
    }

    result = this.wrapped.get(key);

    if (result) {
      this.putCache(key, result);
    } else {
      this.delCache(key);
    }

    return result;
  }

  put (key: Uint8Array, value: Uint8Array): void {
    this.putCache(key, value);

    return this.wrapped.put(key, value);
  }

  terminate () {
    return this.wrapped.terminate();
  }
}
