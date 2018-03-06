// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ConfigType } from '../types';
import type { AllInterfaces } from './types';

const l = require('@polkadot/util/logger')('development');

const generateBlocks = require('./generateBlocks');

module.exports = function initDev ({ dev: { genBlocks } }: ConfigType, interfaces: AllInterfaces): void {
  if (genBlocks) {
    generateBlocks(l, interfaces);
  }
};
