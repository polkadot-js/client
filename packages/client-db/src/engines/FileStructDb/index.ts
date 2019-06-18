// Copyright 2017-2019 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { BaseDb, ProgressCb } from '@polkadot/db/types';
import { KVInfo } from './types';

import codec from '@polkadot/trie-codec';
import { compactFromU8a, compactToU8a, logger } from '@polkadot/util';

import Cache from './Cache';
import Impl from './Impl';
import defaults from './defaults';
import { serializeKey } from './util';

const l = logger('db/struct');

export default class FileStructDb extends Impl implements BaseDb {
  private _cache: Cache<string> = new Cache(16 * 1024);

  drop (): void {
    l.error('drop() is not implemented');
  }

  empty (): void {
    l.error('empty() is not implemented');
  }

  rename (base: string, file: string): void {
    l.error('rename() is not implemented');
  }

  size (): number {
    l.error('size() is not implemented');

    return 0;
  }

  maintain (fn: ProgressCb): void {
    fn({
      isCompleted: true,
      keys: 0,
      percent: 100
    });
  }

  del (key: Uint8Array): void {
    l.error('del() is not implemented');
  }

  private _get (key: Uint8Array): Uint8Array | null {
    const keyInfo = this._findValue(serializeKey(key));

    if (!keyInfo || !keyInfo.valData) {
      return null;
    } else if (!this._isTrie) {
      return keyInfo.valData;
    } else if (!keyInfo.valData[0]) {
      return keyInfo.valData.subarray(1);
    }

    const recoded: Array<Uint8Array | null> = [];
    let offset = 1;

    while (offset < keyInfo.valData.length) {
      if (!keyInfo.valData[offset]) {
        recoded.push(null);
        offset++;
      } else {
        const [length, keyAt] = compactFromU8a(keyInfo.valData.subarray(offset));
        const keyBuff = this._readKey(0, keyAt.toNumber());

        recoded.push(keyBuff.subarray(0, defaults.KEY_DATA_SIZE));
        offset += length;
      }
    }

    return codec.encode(recoded);
  }

  get (key: Uint8Array): Uint8Array | null {
    // l.debug(() => ['get', { key }]);

    const keyStr = key.toString();
    const cached = this._cache.get(keyStr);

    if (cached) {
      return cached;
    }

    const value = this._get(key);

    if (value) {
      this._cache.set(keyStr, value);
    }

    return value;
  }

  put (key: Uint8Array, value: Uint8Array): void {
    // l.debug(() => ['put', { key, value }]);

    let adjusted: Uint8Array | null = null;

    if (this._isTrie) {
      const decoded = codec.decode(value);

      // extension nodes are going away anyway, so just ignore, no worse off.
      if (Array.isArray(decoded) && decoded.length === 17) {
        // only deal with keys where it is an actual trie hash
        const hasArrays = decoded.some((value) =>
          Array.isArray(value) || (value && value.length !== 32)
        );

        // great we are dealing with keys only here
        if (!hasArrays) {
          const recoded: Array<number> = [1];

          for (let index = 0; index < 17; index++) {
            const u8a = decoded[index] as Uint8Array;

            if (u8a) {
              const entry = serializeKey(u8a);
              const keyInfo = this._findValue(entry, null, false) as KVInfo;

              recoded.push(...compactToU8a(keyInfo.keyAt));
            } else {
              recoded.push(0);
            }
          }

          adjusted = new Uint8Array(recoded);
        }
      }

      if (!adjusted) {
        adjusted = new Uint8Array(value.length + 1);
        adjusted.set(value, 1);
      }
    }

    this._cache.set(key.toString(), value);
    this._findValue(serializeKey(key), adjusted || value);
  }
}
