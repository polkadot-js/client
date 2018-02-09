// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { RuntimeInterface } from './types';

const chain = require('./chain');
const crypto = require('./crypto');
const createEnv = require('./environment');
const io = require('./io');
const memory = require('./memory');
const storage = require('./storage');

module.exports = function runtime (memoryInterface: WebAssembly.Memory, chainInterface: ChainConfigType, dbInterface: BaseDbInterface): RuntimeInterface {
  const environment = createEnv(memoryInterface, chainInterface, dbInterface);

  return {
    environment,
    exports: Object.assign(
      chain(environment), crypto(environment), io(environment), memory(environment), storage(environment)
    )
  };
};
