// Copyright 2017-2019 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { BaseDb, ProgressCb } from '@polkadot/db/types';
import { KVInfo } from './types';

import codec from '@polkadot/trie-codec';
import { BITMAP } from '@polkadot/trie-codec/constants';
import { logger } from '@polkadot/util';

import Cache from './Cache';
import Impl from './Impl';
import defaults from './defaults';
import { readU8aU32, serializeKey, u32ToArray } from './util';

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
    const bitmap = (keyInfo.valData[1] << 8) + keyInfo.valData[2];
    let offset = 3;

    for (let index = 0; index < 16; index++) {
      if (bitmap & BITMAP[index]) {
        const keyBuff = this._readKey(0, readU8aU32(keyInfo.valData, offset));

        recoded.push(keyBuff.subarray(0, defaults.KEY_DATA_SIZE));
        offset += defaults.U32_SIZE;
      } else {
        recoded.push(null);
      }
    }

    recoded.push(null);

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
        if (!hasArrays && !decoded[16]) {
          let bitmap = 0;
          const recoded: Array<number> = [1, 0, 0];

          for (let index = 0; index < 16; index++) {
            const u8a = decoded[index] as Uint8Array;

            if (u8a) {
              const entry = serializeKey(u8a);
              const keyInfo = this._findValue(entry, null, false) as KVInfo;

              bitmap |= BITMAP[index];
              recoded.push(...u32ToArray(keyInfo.keyAt));
            }
          }

          recoded[1] = bitmap >> 8;
          recoded[2] = bitmap & 255;

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
