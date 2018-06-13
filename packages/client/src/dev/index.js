// Copyright 2017-2018 @polkadot/client authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Config } from '../types';
import type { AllInterfaces } from './types';

const l = require('@polkadot/util/logger')('development');

const generateBlocks = require('./generateBlocks');

module.exports = function initDev ({ dev: { genBlocks } }: Config, interfaces: AllInterfaces): void {
  if (genBlocks) {
    generateBlocks(l, interfaces);
  }
};
