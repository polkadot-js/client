// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ChainState, ChainGenesis, ChainGenesisState } from '../types';

const initBlock = require('./block');
const initState = require('./state');

module.exports = function genesis (self: ChainState, state: ChainGenesisState): ChainGenesis {
  initState(self, state);

  return initBlock(self);
};
