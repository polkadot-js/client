// Copyright 2017-2018 @polkadot/client-wasm authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { UncheckedRaw } from '@polkadot/primitives/extrinsic';
import type { ExecutorState } from '../types';

import extrinsics from '@polkadot/extrinsics';
import encodeUnchecked from '@polkadot/extrinsics-codec/encode/unchecked';
import testingKeypairs from '@polkadot/util-keyring/testingPairs';

const keyring = testingKeypairs();

export default function inherentExtrinsics (self: ExecutorState, timestamp: number, _extrinsics: Array<UncheckedRaw>): Array<UncheckedRaw> {
  return [
    encodeUnchecked(keyring.nobody, 0)(
      extrinsics.timestamp.public.set,
      [timestamp]
    ),
    encodeUnchecked(keyring.nobody, 0)(
      extrinsics.parachains.public.setHeads,
      [[]]
    )
  ].concat(_extrinsics);
}
