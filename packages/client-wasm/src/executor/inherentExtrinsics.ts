// Copyright 2017-2018 @polkadot/client-wasm authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { UncheckedRaw } from '@polkadot/primitives/extrinsic';
import { ExecutorState } from '../types';

import extrinsics from '@polkadot/extrinsics';
import encodeUnchecked from '@polkadot/extrinsics/codec/encode/unchecked';
import testingKeypairs from '@polkadot/util-keyring/testingPairs';

const keyring = testingKeypairs();
const timestampSet = extrinsics.timestamp.public.set;
const parachainsSet = extrinsics.parachains.public.setHeads;

export default function inherentExtrinsics (self: ExecutorState, timestamp: number, _extrinsics: Array<UncheckedRaw>): Array<UncheckedRaw> {
  return [
    encodeUnchecked(keyring.nobody, 0)(
      timestampSet,[timestamp]
    ),
    encodeUnchecked(keyring.nobody, 0)(
      parachainsSet, [[]]
    )
  ].concat(_extrinsics);
}
