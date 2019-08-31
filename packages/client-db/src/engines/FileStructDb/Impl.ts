// Copyright 2017-2019 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { KVInfo, KeyParts, ValInfo } from './types';

// import { logger } from '@polkadot/util';

import Files from './Files';
import { KEY_DATA_SIZE } from './constants';
import { modifyHdr, modifyKey, newHdr, newKey, parseHdr, parseKey, serializeKey } from './util';

// const l = logger('db/struct');

export default class Impl extends Files {
  protected _findValue (key: KeyParts, value: Uint8Array | null = null, withValue = true, keyIndex = 0, hdrAt = 0): KVInfo | null {
    const hdr = this._readHdr(key.fileAt, hdrAt);
    const parsedHdr = parseHdr(hdr, key.nibbles[keyIndex]);

    if (parsedHdr.isKey) {
      return this.__retrieveKey(key, value, withValue, keyIndex, hdr, hdrAt, parsedHdr.linkTo);
    } else if (parsedHdr.linkTo) {
      return this._findValue(key, value, withValue, keyIndex + 1, parsedHdr.linkTo);
    }

    return this.__retrieveEmpty(key, value, keyIndex, hdr, hdrAt);
  }

  private __appendNewValue (key: KeyParts, valData: Uint8Array): ValInfo {
    return {
      valAt: this._appendVal(key.fileAt, valData),
      valData,
      valSize: valData.length
    };
  }

  private __appendNewKeyValue (key: KeyParts, value: Uint8Array): KVInfo {
    const kvInfo = this.__appendNewValue(key, value) as KVInfo;

    kvInfo.keyData = newKey(key, kvInfo);
    kvInfo.keyAt = this._appendKey(key.fileAt, kvInfo.keyData);

    return kvInfo;
  }

  private __retrieveEmpty (key: KeyParts, value: Uint8Array | null, keyIndex: number, hdr: Uint8Array, hdrAt: number): KVInfo | null {
    if (!value) {
      return null;
    }

    const hdrIndex = key.nibbles[keyIndex];
    const newInfo = this.__appendNewKeyValue(key, value);

    modifyHdr(hdr, hdrIndex, newInfo.keyAt, true);

    this._updateHdr(key.fileAt, hdrAt, hdr);

    return newInfo;
  }

  private __retrieveKey (key: KeyParts, value: Uint8Array | null, withValue: boolean, keyIndex: number, hdr: Uint8Array, hdrAt: number, keyAt: number): KVInfo | null {
    const hdrIndex = key.nibbles[keyIndex];
    const keyData = this._readKey(key.fileAt, keyAt);
    const prevKey = serializeKey(keyData.subarray(0, KEY_DATA_SIZE));
    let matchIndex = keyIndex;

    // see if this key matches fully with what we are supplied
    while (matchIndex < key.nibbles.length) {
      if (prevKey.nibbles[matchIndex] !== key.nibbles[matchIndex]) {
        break;
      }

      matchIndex++;
    }

    // we have a match, either retrieve or update
    if (matchIndex === key.nibbles.length) {
      if (value) {
        const { valAt, valData, valSize } = this.__appendNewValue(key, value);

        this._updateKey(key.fileAt, keyAt, modifyKey(keyData, valAt, valSize));

        return { keyAt, keyData, valAt, valData, valSize };
      }

      const { valAt, valSize } = parseKey(keyData);
      const valData = withValue
        ? this._readVal(key.fileAt, valAt, valSize)
        : null;

      return { keyAt, keyData, valAt, valData, valSize };
    } else if (!value) {
      return null;
    }

    // write the new key and create a header with the 2 new values
    const newKv = this.__appendNewKeyValue(key, value);
    let depth = matchIndex - keyIndex - 1;

    // write the last header - this contains the old and new keys at the correct indexes
    let lastAt = this._appendHdr(key.fileAt, newHdr([
      { dataAt: keyAt, hdrIndex: prevKey.nibbles[matchIndex], isKey: true },
      { dataAt: newKv.keyAt, hdrIndex: key.nibbles[matchIndex], isKey: true }
    ]));

    // make a tree from the header we are modifying down to the others
    for (let offset = 1; depth > 0; depth--, offset++) {
      lastAt = this._appendHdr(key.fileAt, newHdr([
        { dataAt: lastAt, hdrIndex: key.nibbles[matchIndex - offset], isKey: false }
      ]));
    }

    this._updateHdr(key.fileAt, hdrAt, modifyHdr(hdr, hdrIndex, lastAt, false));

    return newKv;
  }
}
