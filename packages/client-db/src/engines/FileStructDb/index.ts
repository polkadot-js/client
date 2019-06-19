// Copyright 2017-2019 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { BaseDb, ProgressCb } from '@polkadot/db/types';
import { KVInfo } from './types';

import codec from '@polkadot/trie-codec';
import { compactFromU8a, compactToU8a, logger } from '@polkadot/util';

import Cache from './Cache';
import Impl from './Impl';
import { KEY_DATA_SIZE } from './defaults';
import { serializeKey } from './util';
// import { readU8aU32, writeU8aU32 } from './util';

const l = logger('db/struct');

const TRIE_BRANCH_LEN = 17;

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

    // 17 entries, assuming there may be an encoded value in there
    const recoded: Array<Uint8Array | null> = [
      null, null, null, null,
      null, null, null, null,
      null, null, null, null,
      null, null, null, null,
      null
    ];
    let index = 0;
    let offset = 1;

    try {
      while (offset < keyInfo.valData.length) {
        if (keyInfo.valData[offset]) {
          const [length, keyAt] = compactFromU8a(keyInfo.valData.subarray(offset));
          // const keyAt = readU8aU32(keyInfo.valData, offset) & U_VALUE;
          const keyBuff = this._readKey(keyAt.toNumber());

          // recoded.push(keyBuff.subarray(0, KEY_DATA_SIZE));
          recoded[index] = keyBuff.subarray(0, KEY_DATA_SIZE);
          offset += length;
          // offset += 4;
        } else {
          // recoded.push(null);
          offset++;
        }

        index++;
      }
    } catch (error) {
      console.error(error.message, key, keyInfo.valData, keyInfo.keyAt, JSON.stringify(keyInfo));

      throw error;
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

    this._cache.set(key.toString(), value);

    if (!this._isTrie) {
      this._findValue(serializeKey(key), value);
      return;
    }

    let adjusted: Uint8Array;
    const decoded = codec.decode(value);
    const isEncodable = Array.isArray(decoded) &&
      decoded.length === TRIE_BRANCH_LEN &&
      !decoded.some((value) => value && value.length !== KEY_DATA_SIZE);

    // extension nodes are going away anyway, so just ignore, no worse off.
    if (isEncodable) {
      // instead of growing and allocating, we probably want to dynamically allocate
      // the maximum possible size and then work with the Uint8Array (we can adjust
      // the size with a subarray at the end)
      const recoded: Array<number> = [TRIE_BRANCH_LEN];
      // const recoded = new Uint8Array((TRIE_BRANCH_LEN * 4) + 1);
      // let length: number = 1;
      // recoded[0] = TRIE_BRANCH_LEN;

      for (let index = 0; index < TRIE_BRANCH_LEN; index++) {
        const u8a = (decoded as Array<Uint8Array>)[index];

        if (u8a) {
          const keyInfo = this._findValue(serializeKey(u8a), null, false) as KVInfo;

          recoded.push(...compactToU8a(keyInfo.keyAt));
          // writeU8aU32(recoded, keyInfo.keyAt & F_VALUE, length);
          // length += 4;
        } else {
          recoded.push(0);
          // recoded[length] = 0;
          // length++;
        }
      }

      adjusted = new Uint8Array(recoded);
      // adjusted = recoded.subarray(0, offset);
    } else {
      adjusted = new Uint8Array(value.length + 1);
      adjusted.set(value, 1);
    }

    this._findValue(serializeKey(key), adjusted);
  }
}
