// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ChainDefinition, ChainName } from './types';

const assert = require('@polkadot/util/assert');

const chains = require('./chains');

module.exports = function load (name: string): ChainDefinition {
  // flowlint-next-line unclear-type:off
  const chain = chains[((name: any): ChainName)];

  assert(chain, `Unable to find builtin chain '${name}'`);

  return chain;
};
