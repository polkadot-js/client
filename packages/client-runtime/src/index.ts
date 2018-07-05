// Copyright 2017-2018 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { TrieDb } from '@polkadot/client-db/types';
import { RuntimeInterface, RuntimeInterface$Exports } from './types';

import createChain from './chain';
import createCrypto from './crypto';
import createEnv from './environment';
import createIo from './io';
import createMemory from './memory';
import createSandbox from './sandbox';
import createStorage from './storage';
import instrument from './instrument';

export default function runtime (stateDb: TrieDb): RuntimeInterface {
  const environment = createEnv(stateDb);

  return {
    environment,
    exports: (Object.assign(
      {}, createChain(environment), createCrypto(environment), createIo(environment), createMemory(environment), createSandbox(environment), createStorage(environment)
    ) as RuntimeInterface$Exports),
    instrument: {
      start: instrument.clear,
      stop: instrument.stats
    }
  };
}
