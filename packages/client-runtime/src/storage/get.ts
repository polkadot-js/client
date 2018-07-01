// Copyright 2017-2018 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { TrieDb } from '@polkadot/util-triedb/types';

export default function get (db: TrieDb, key: Uint8Array, offset: number, maxLength: number): Uint8Array | null {
  const data = db.get(key);

  if (data === null) {
    return null;
  }

  const dataLength = Math.min(maxLength, data.length - offset);

  return data.subarray(offset, offset + dataLength);
}
