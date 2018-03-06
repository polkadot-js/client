// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ChainConfig } from '@polkadot/client-chains/types';
import type { BaseDbInterface } from '@polkadot/client-db/types';
import type { RuntimeInterface, RuntimeInterface$Exports } from './types';

const createChain = require('./chain');
const createCrypto = require('./crypto');
const createEnv = require('./environment');
const createIo = require('./io');
const createMemory = require('./memory');
const createStorage = require('./storage');

module.exports = function runtime (chain: ChainConfig, stateDb: BaseDbInterface): RuntimeInterface {
  const environment = createEnv(chain, stateDb);

  return {
    environment,
    exports: (Object.assign(
      // flowlint-next-line unclear-type:off
      ({}: any),
      createChain(environment), createCrypto(environment), createIo(environment), createMemory(environment), createStorage(environment)
    ): $Shape<RuntimeInterface$Exports>)
  };
};
