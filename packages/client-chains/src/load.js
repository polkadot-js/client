// Copyright 2017-2018 @polkadot/client-chains authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ChainGenesisState } from './types';

import assert from '@polkadot/util/assert';

import chains from './chains';

// TODO We should load chains from json files as well

export default function load (name: string): ChainGenesisState {
  // flowlint-next-line unclear-type:off
  const chain = chains[(name: any)];

  assert(chain, `Unable to find builtin chain '${name}'`);

  return chain;
}
