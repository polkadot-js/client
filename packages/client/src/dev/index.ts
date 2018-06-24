// Copyright 2017-2018 @polkadot/client authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Config } from '../types';
import { AllInterfaces } from './types';

import logger from '@polkadot/util/logger';

import generateBlocks from './generateBlocks';

const l = logger('testing');

export default function initDev ({ dev: { genBlocks } }: Config, interfaces: AllInterfaces): void {
  if (genBlocks) {
    generateBlocks(l, interfaces);
  }
}
