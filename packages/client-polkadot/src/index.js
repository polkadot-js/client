// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ConfigType } from '@polkadot/client/types';
import type { ChainConfigType } from '@polkadot/client-chains/types';
import type { BaseDbInterface } from '@polkadot/client-db/types';
import type { PolkadotInterface } from './types';

const createDb = require('./db');
const createWasm = require('./wasm');

module.exports = function polkadot (config: ConfigType, chain: ChainConfigType, db: BaseDbInterface, code: Uint8Array): PolkadotInterface {
  const { instance, runtime } = createWasm(config, chain, db, code);

  return {
    db: createDb(runtime.environment.db),
    instance
  };
};
