// Copyright 2017-2018 @polkadot/client authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { AllInterfaces } from '../types';
import type { Logger } from '@polkadot/util/types';

const interval = require('./interval');

module.exports = function generateBlocks (l: Logger, { chain, p2p }: AllInterfaces): void {
  setInterval(() => {
    interval(l, chain, p2p);
  }, 5000);
};
