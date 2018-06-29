// Copyright 2017-2018 @polkadot/client-chains authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { ChainGenesisState } from './types';

import assert from '@polkadot/util/assert';

import chains from './chains';

// TODO We should load chains from json files as well

export default function load (name: string): ChainGenesisState {
  const chain = chains[name];

  assert(chain, `Unable to find builtin chain '${name}'`);

  return chain;
}