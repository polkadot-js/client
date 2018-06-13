// Copyright 2017-2018 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { TrieDb } from '@polkadot/util-triedb/types';
import type { RuntimeInterface, RuntimeInterface$Exports } from './types';

const createChain = require('./chain');
const createCrypto = require('./crypto');
const createEnv = require('./environment');
const createIo = require('./io');
const createMemory = require('./memory');
const createSandbox = require('./sandbox');
const createStorage = require('./storage');
const instrument = require('./instrument');

module.exports = function runtime (stateDb: TrieDb): RuntimeInterface {
  const environment = createEnv(stateDb);

  return {
    environment,
    exports: (Object.assign(
      // flowlint-next-line unclear-type:off
      ({}: any),
      createChain(environment), createCrypto(environment), createIo(environment), createMemory(environment), createSandbox(environment), createStorage(environment)
    ): $Shape<RuntimeInterface$Exports>),
    instrument: {
      start: instrument.clear,
      stop: instrument.stats
    }
  };
};
