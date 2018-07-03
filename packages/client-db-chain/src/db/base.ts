// Copyright 2017-2018 @polkadot/client-db-chain authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { BaseDb } from '@polkadot/client-db/types';

type Base <T> = {
  del (key: Uint8Array): void,
  get (key: Uint8Array): Uint8Array,
  set (key: Uint8Array, value: T, raw: Uint8Array): void,
  onUpdate (subscriber: (value: T, raw: Uint8Array) => void): void
};

type Subscribers <T> = Array<(value: T, raw: Uint8Array) => void>;

export default function base <T> (db: BaseDb): Base<T> {
  const subscribers: Subscribers<T> = [];

  return {
    del: (key: Uint8Array): void =>
      db.del(key),
    get: (key: Uint8Array): Uint8Array =>
      db.get(key) || new Uint8Array([]),
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
