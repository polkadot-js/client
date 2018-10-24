// Copyright 2017-2018 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { SectionItem } from '@polkadot/params/types';
import { Storage$Key$Value } from '@polkadot/storage/types';
import { BaseDb } from '@polkadot/db/types';
import { StorageMethod$ArrayU8a } from '../types';

import { bnToU8a, u8aConcat, u8aToBn } from '@polkadot/util';

import creator from '../key';

export default function decodeArrayU8a <T> (db: BaseDb, key: SectionItem<T>): StorageMethod$ArrayU8a {
  const createKey = creator(key);

  return {
    del: (...keyParams: Array<Storage$Key$Value>): void =>
      db.del(createKey(keyParams)),
    get: (...keyParams: Array<Storage$Key$Value>): Array<Uint8Array> => {
      const u8a = db.get(createKey(keyParams));

      if (u8a === null) {
        return [];
      }

      const length = u8aToBn(u8a.subarray(0, 4), true).toNumber();
      const result = [];
      let offset = 4;

      for (let index = 0; index < length; index++, offset += 32) {
        result.push(u8a.subarray(offset, offset + 32));
      }

      return result;
    },
    set: (value: Array<Uint8Array>, ...keyParams: Array<Storage$Key$Value>): void =>
      db.put(createKey(keyParams), u8aConcat(
        bnToU8a(value.length, 32, true),
        u8aConcat.apply(null, value))
      ),
    onUpdate: (updater: (value: Array<Uint8Array>, raw: Uint8Array) => void): void => {
      throw new Error(`No subscriber available for db/arrayU8a`);
    }
  };
}
