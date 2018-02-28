// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { RuntimeInterface } from '@polkadot/client-runtime/types';
import type { BlockHeaderType } from '@polkadot/primitives/blockHeader';
import type { PolkadotUnchecked } from '@polkadot/primitives/transaction';

const decodeHeader = require('@polkadot/primitives-codec/blockHeader/decode');
const encodeHeader = require('@polkadot/primitives-codec/blockHeader/encode');
const encodeUtx = require('@polkadot/primitives-codec/unchecked/encode');
const u8aConcat = require('@polkadot/util/u8a/concat');
const u8aToHex = require('@polkadot/util/u8a/toHex');

const call = require('./call');

module.exports = function executeTransaction (instance: WebAssemblyInstance$Exports, runtime: RuntimeInterface, header: BlockHeaderType, utx: PolkadotUnchecked): BlockHeaderType {
  const { hi, lo } = call(instance, runtime, 'execute_transaction')(
    u8aConcat([
      encodeHeader(header),
      encodeUtx(utx)
    ])
  );
  const data = runtime.environment.heap.get(lo, hi);

  runtime.environment.l.debug(() => ['received', u8aToHex(data)]);

  return decodeHeader(data);
};
