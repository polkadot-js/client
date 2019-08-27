// Copyright 2017-2019 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { BaseDb } from '@polkadot/db/types';
import { StorageMethod$ArrayU8a } from '../types';

import { bnToU8a, u8aConcat, u8aToBn } from '@polkadot/util';

export default function decodeArrayU8a (db: BaseDb, createKey: Function): StorageMethod$ArrayU8a {
  return {
    del: (keyParam: any): void =>
      db.del(createKey(keyParam)),
    get: (keyParam: any): Uint8Array[] => {
      const u8a = db.get(createKey(keyParam));

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
    set: (value: Uint8Array[], keyParam: any): void =>
      db.put(createKey(keyParam), u8aConcat(
        bnToU8a(value.length, 32, true),
        u8aConcat.apply(null, value))
      ),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onUpdate: (updater: (value: Uint8Array[], raw: Uint8Array) => void): void => {
      throw new Error('No subscriber available for db/arrayU8a');
    }
  };
}
