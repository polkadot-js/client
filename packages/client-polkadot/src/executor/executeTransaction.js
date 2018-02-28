// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { RuntimeInterface } from '@polkadot/client-runtime/types';
import type { BlockHeaderType } from '@polkadot/primitives/blockHeader';
import type { PolkadotUnchecked } from '@polkadot/primitives/transaction';
import type { CallResult } from './types';

const encodeHeader = require('@polkadot/primitives-codec/blockHeader/encode');
const encodeUtx = require('@polkadot/primitives-codec/unchecked/encode');
const u8aConcat = require('@polkadot/util/u8a/concat');

const call = require('./call');

module.exports = function executeTransaction (instance: WebAssemblyInstance$Exports, runtime: RuntimeInterface, header: BlockHeaderType, utx: PolkadotUnchecked): CallResult {
  // u8aConcat([
  //   encodeHeader(
  //     createHeader({
  //       number: 1,
  //       transactionRoot: new Uint8Array([])
  //     })
  //   ),
  //   encodeUnchecked(
  //     uncheckedSign(keyring.one, stakingTransfer(
  //       keyring.one.publicKey, keyring.two.publicKey, 69, 0
  //     ))
  //   )
  // ])

  return call(instance, runtime, 'execute_transaction')(
    u8aConcat([
      encodeHeader(header),
      encodeUtx(utx)
    ])
  );
};
