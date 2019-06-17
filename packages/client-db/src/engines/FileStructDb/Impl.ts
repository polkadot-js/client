// Copyright 2017-2019 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { KVInfo, KeyParts, Slot, ValInfo } from './types';

// import { logger } from '@polkadot/util';

import Files from './Files';
import defaults from './defaults';
import { modifyHdr, modifyKey, newHdr, newKey, parseHdr, parseKey, serializeKey } from './util';

// const l = logger('db/struct');

export default class Impl extends Files {
  protected _findValue (key: KeyParts, value: Uint8Array | null = null, withValue: boolean = true, keyIndex: number = 0, hdrAt: number = 0): KVInfo | null {
    const hdr = this._readHdr(key.index, hdrAt);
    const parsedHdr = parseHdr(hdr, key.parts[keyIndex]);

    switch (parsedHdr.type) {
      case Slot.EMPTY:
        return this.__retrieveEmpty(key, value, keyIndex, hdr, hdrAt);

      case Slot.HDR:
        return this._findValue(key, value, withValue, keyIndex + 1, parsedHdr.at);

      case Slot.KEY:
        return this.__retrieveKey(key, value, withValue, keyIndex, hdr, hdrAt, parsedHdr.at);

      default:
        throw new Error(`Unhandled entry type ${parsedHdr.type}`);
    }
  }

  private __appendNewValue (key: KeyParts, valData: Uint8Array): ValInfo {
    return {
      valAt: this._appendVal(key.index, valData),
      valData,
      valSize: valData.length
    };
  }

  private __appendNewKeyValue (key: KeyParts, value: Uint8Array): KVInfo {
    const valInfo = this.__appendNewValue(key, value);
    const keyData = newKey(key, valInfo);
    const keyAt = this._appendKey(key.index, keyData);

    return { ...valInfo, keyAt, keyData };
  }

  private __retrieveEmpty (key: KeyParts, value: Uint8Array | null, keyIndex: number, hdr: Uint8Array, hdrAt: number): KVInfo | null {
    if (!value) {
      return null;
    }

    const hdrIndex = key.parts[keyIndex];
    const newInfo = this.__appendNewKeyValue(key, value);

    modifyHdr(hdr, hdrIndex, Slot.KEY, newInfo.keyAt);
    this._updateHdr(key.index, hdrAt, hdr);

    return newInfo;
  }

  private __retrieveKey (key: KeyParts, value: Uint8Array | null, withValue: boolean, keyIndex: number, hdr: Uint8Array, hdrAt: number, keyAt: number): KVInfo | null {
    const hdrIndex = key.parts[keyIndex];
    const keyData = this._readKey(key.index, keyAt);
    const prevKey = serializeKey(keyData.subarray(0, defaults.KEY_DATA_SIZE));
    let matchIndex = keyIndex;

    // see if this key matches fully with what we are supplied
    while (matchIndex < key.parts.length) {
      if (prevKey.parts[matchIndex] !== key.parts[matchIndex]) {
        break;
      }

      matchIndex++;
    }

    // we have a match, either retrieve or update
    if (matchIndex === key.parts.length) {
      if (value) {
        const { valAt, valData, valSize } = this.__appendNewValue(key, value);

        this._updateKey(key.index, keyAt, modifyKey(keyData, valAt, valSize));

        return { keyAt, keyData, valAt, valData, valSize };
      }

      const { valAt, valSize } = parseKey(keyData);
      const valData = withValue
        ? this._readVal(key.index, valAt, valSize)
        : null;

      return { keyAt, keyData, valAt, valData, valSize };
    } else if (!value) {
      return null;
    }

    // write the new key and create a header with the 2 new values
    const newKv = this.__appendNewKeyValue(key, value);
    let depth = matchIndex - keyIndex - 1;

    // write the last header - this contains the old and new keys at the correct indexes
    let lastAt = this._appendHdr(key.index, newHdr([
      { dataAt: keyAt, hdrIndex: prevKey.parts[matchIndex], type: Slot.KEY },
      { dataAt: newKv.keyAt, hdrIndex: key.parts[matchIndex], type: Slot.KEY }
    ]));

    // make a tree from the header we are modifying down to the others
    for (let offset = 1; depth > 0; depth--, offset++) {
      lastAt = this._appendHdr(key.index, newHdr([
        { dataAt: lastAt, hdrIndex: key.parts[matchIndex - offset], type: Slot.HDR }
      ]));
    }

    this._updateHdr(key.index, hdrAt, modifyHdr(hdr, hdrIndex, Slot.HDR, lastAt));

    return newKv;
  }
}
