// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { UncheckedRaw } from '@polkadot/primitives/extrinsic';
import type { ExecutorState } from '../types';

const extrinsics = require('@polkadot/extrinsics');
const encodeUnchecked = require('@polkadot/extrinsics-codec/encode/unchecked');
const keyring = require('@polkadot/util-keyring/testingPairs')();

module.exports = function inherentExtrinsics (self: ExecutorState, timestamp: number, _extrinsics: Array<UncheckedRaw>): Array<UncheckedRaw> {
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
};
