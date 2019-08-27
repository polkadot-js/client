// Copyright 2017-2019 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { BaseDb, ProgressCb } from '@polkadot/db/types';
import { KVInfo } from './types';

import codec from '@polkadot/trie-codec';
import { BITMAP } from '@polkadot/trie-codec/constants';
import { logger, compactToU8a, compactFromU8a } from '@polkadot/util';

import Cache from './Cache';
import Impl from './Impl';
import { KEY_DATA_SIZE, U32_SIZE } from './constants';
import { serializeKey } from './util';

const l = logger('db/struct');

const TRIE_BRANCH_KEYS = 16;
const TRIE_BRANCH_LEN = TRIE_BRANCH_KEYS + 1;
const TRIE_ENC_SIZE = U32_SIZE + 2;

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
    const info = this._findValue(serializeKey(key));

    // console.log('_get', this._isTrie, key, info);

    if (!info || !info.valData) {
      return null;
    } else if (!this._isTrie) {
      return info.valData;
    } else if (!info.valData[0]) {
      return info.valData.subarray(1);
    }

    // 17 entries, assuming there may be an encoded value in there
    const recoded: (Uint8Array | null)[] = [
      null, null, null, null,
      null, null, null, null,
      null, null, null, null,
      null, null, null, null,
      null
    ];
    let offset = 3;
    const bitmap = info.valData[1] + (info.valData[2] << 8);

    for (let index = 0; index < TRIE_BRANCH_KEYS; index++) {
      if (bitmap & BITMAP[index]) {
        const fileAt = info.valData[offset++];
        const [length, keyAt] = compactFromU8a(info.valData.subarray(offset));

        recoded[index] = this._readKey(fileAt, keyAt.toNumber()).subarray(0, KEY_DATA_SIZE);
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
      const recoded = new Uint8Array((TRIE_BRANCH_KEYS * TRIE_ENC_SIZE) + 1 + 2);
      let length: number = 3;
      let bitmap = 0;

      for (let index = 0; index < TRIE_BRANCH_KEYS; index++) {
        const u8a = (decoded as Uint8Array[])[index];

        if (u8a) {
          const key = serializeKey(u8a);
          const info = this._findValue(key, null, false);
          const atEnc = compactToU8a((info as KVInfo).keyAt);

          bitmap |= BITMAP[index];
          recoded[length++] = key.fileAt;

          recoded.set(atEnc, length);

          length += atEnc.length;
        }
      }

      recoded[0] = TRIE_BRANCH_KEYS;
      recoded[1] = bitmap & 0xff;
      recoded[2] = bitmap >> 8;
      adjusted = recoded.subarray(0, length);
    } else {
      adjusted = new Uint8Array(value.length + 1);
      adjusted.set(value, 1);
    }

    this._findValue(serializeKey(key), adjusted);
  }
}
