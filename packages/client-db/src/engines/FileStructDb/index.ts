// Copyright 2017-2019 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { BaseDb, ProgressCb } from '@polkadot/db/types';
import { KVInfo } from './types';

import codec from '@polkadot/trie-codec';
import { logger } from '@polkadot/util';

import Impl from './Impl';
import defaults from './defaults';
import { serializeKey, readU8aU32, u32ToArray } from './util';

const l = logger('db/struct');

const FLAG_EMPTY = 0;
const FLAG_LINKED = 0b10000000;
const UNFLAG_LINKED = 0b01111111;

export default class FileStructDb extends Impl implements BaseDb {
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

  get (key: Uint8Array): Uint8Array | null {
    // l.debug(() => ['get', { key }]);

    const keyInfo = this._findValue(serializeKey(key));

    if (!keyInfo || !keyInfo.valData) {
      return null;
    }

    let adjusted: Uint8Array | null = null;

    if (this._isTrie) {
      if (keyInfo.valData[0] === FLAG_EMPTY) {
        adjusted = keyInfo.valData.subarray(1);
      } else {
        let offset = 1;
        const recoded: Array<Uint8Array | null> = [];

        while (offset < keyInfo.valData.length) {
          const flag = keyInfo.valData[offset++];

          if (flag === FLAG_EMPTY) {
            recoded.push(null);
          } else {
            const keyBuff = this._readKey(flag & UNFLAG_LINKED, readU8aU32(keyInfo.valData, offset));

            offset += defaults.U32_SIZE;

            recoded.push(keyBuff.subarray(0, defaults.KEY_DATA_SIZE));
          }
        }

        adjusted = codec.encode(recoded);
      }
    }

    return adjusted || keyInfo.valData;
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
          const recoded: Array<number> = [17 | FLAG_LINKED];

          decoded.forEach((value) => {
            const u8a = value as Uint8Array | null;

            if (u8a) {
              const entry = serializeKey(u8a);
              const keyInfo = this._findValue(entry, null, false) as KVInfo;

              recoded.push(entry.index | FLAG_LINKED, ...u32ToArray(keyInfo.keyAt));
            } else {
              recoded.push(FLAG_EMPTY);
            }
          });

          adjusted = new Uint8Array(recoded);
        }
      }

      if (!adjusted) {
        adjusted = new Uint8Array(value.length + 1);
        adjusted.set(value, 1);
      }
    }

    this._findValue(serializeKey(key), adjusted || value);
  }
}
