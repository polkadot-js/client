// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ChainConfig$Genesis$Block, ChainState } from '../types';

const initBlock = require('./block');
const initState = require('./state');

module.exports = function genesis (self: ChainState): ChainConfig$Genesis$Block {
  initState(self);

  return initBlock(self);
};
