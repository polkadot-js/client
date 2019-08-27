// Copyright 2017-2019 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { BaseDb } from '@polkadot/db/types';

interface Base <T> {
  del (key: Uint8Array): void;
  get (key: Uint8Array): Uint8Array;
  set (key: Uint8Array, value: T, raw: Uint8Array): void;
  onUpdate (subscriber: (value: T, raw: Uint8Array) => void): void;
}

type Subscribers <T> = ((value: T, raw: Uint8Array) => void)[];

export default function base <T> (db: BaseDb): Base<T> {
  const subscribers: Subscribers<T> = [];

  return {
    del: (key: Uint8Array): void =>
      db.del(key),
    get: (key: Uint8Array): Uint8Array => {
      const value = db.get(key);

      return value || new Uint8Array([]);
    },
    set: (key: Uint8Array, value: T, raw: Uint8Array): void => {
      db.put(key, raw);
      subscribers.forEach((subscriber) =>
        subscriber(value, raw)
      );
    },
    onUpdate: (subscriber: (value: T, raw: Uint8Array) => void): void => {
      subscribers.push(subscriber);
    }
  };
}
