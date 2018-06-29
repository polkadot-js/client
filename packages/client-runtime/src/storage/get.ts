// Copyright 2017-2018 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { TrieDb } from '@polkadot/util-triedb/types';

export default function get (db: TrieDb, key: Uint8Array, maxLength: number = -1): Uint8Array | null {
  const data = db.get(key);

  if (data === null) {
    return null;
  }

  const dataLength = maxLength === -1 || data.length < maxLength
    ? data.length
    : maxLength;

  return data.subarray(0, dataLength);
}