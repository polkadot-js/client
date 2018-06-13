// Copyright 2017-2018 @polkadot/client-chains authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ChainGenesisState, ChainName } from './types';

const assert = require('@polkadot/util/assert');

const chains = require('./chains');

// TODO We should load chains from json files as well

module.exports = function load (name: string): ChainGenesisState {
  // flowlint-next-line unclear-type:off
  const chain = chains[((name: any): ChainName)];

  assert(chain, `Unable to find builtin chain '${name}'`);

  return chain;
};
