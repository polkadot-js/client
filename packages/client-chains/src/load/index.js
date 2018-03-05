// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ConfigType } from '@polkadot/client/types';
import type { ChainConfigType } from '../types';

const findAndLoad = require('./find');
const looseToStrict = require('./toStrict');

module.exports = function load ({ chain }: ConfigType): ChainConfigType {
  return looseToStrict(
    findAndLoad(chain)
  );
};
