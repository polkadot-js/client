// Copyright 2017-2018 @polkadot/client-db-chain authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Section$Item } from '@polkadot/params/types';
import { Storage$Key$Value } from '@polkadot/storage/types';

import bindKey from '@polkadot/storage/key';

type Creator = (keyParams: Storage$Key$Value[]) => Uint8Array;

export default function createKey <T> (key: Section$Item<T>): Creator {
  const keyCreator = bindKey(key);

  return (keyParams: Storage$Key$Value[] = []): Uint8Array =>
    keyCreator.apply(null, keyParams);
}
