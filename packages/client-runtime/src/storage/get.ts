// Copyright 2017-2019 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { StateDb } from '@polkadot/client-db/types';

export default function get (stateDb: StateDb, key: Uint8Array, offset: number, maxLength: number): Uint8Array | null {
  const data = stateDb.db.get(key);

  if (data === null) {
    return null;
  }

  const dataLength = Math.min(maxLength, data.length - offset);

  return data.subarray(offset, offset + dataLength);
}
