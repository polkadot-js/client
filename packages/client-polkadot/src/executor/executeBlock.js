// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { RuntimeInterface } from '@polkadot/client-runtime/types';
import type { PolkadotBlock } from '@polkadot/primitives/block';

const encodeBlock = require('@polkadot/primitives-codec/block/encode');

const call = require('./call');

module.exports = function executeBlock (instance: WebAssemblyInstance$Exports, runtime: RuntimeInterface, block: PolkadotBlock): boolean {
  const result = call(instance, runtime, 'execute_block')(
    encodeBlock(block)
  );

  return result.lo === 1;
};
