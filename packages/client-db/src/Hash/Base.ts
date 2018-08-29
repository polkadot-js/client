// Copyright 2017-2018 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { BaseDb } from '../types';

export default class Base {
  protected wrapped: BaseDb;

  constructor (wrapped: BaseDb) {
    this.wrapped = wrapped;
  }

  initialise (): Promise<void> {
    return this.wrapped.initialise();
  }

  del (key: Uint8Array): void {
    return this.wrapped.del(key);
  }

  get (key: Uint8Array): Uint8Array | null {
    return this.wrapped.get(key);
  }

  put (key: Uint8Array, value: Uint8Array): void {
    return this.wrapped.put(key, value);
  }

  terminate () {
    return this.wrapped.terminate();
  }
}
