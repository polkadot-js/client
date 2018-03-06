// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ChainConfigLoose } from '../types';

const ExtError = require('@polkadot/util/ext/error');

const fromDisk = require('./fromDisk');
const validateChain = require('../validate');

module.exports = function findAndLoad (name: string): ChainConfigLoose {
  // builtin?
  if (!/\.json$/.test(name)) {
    try {
      // $FlowFixMe naughty, not a literal
      return require(`../chains/${name}`);
    } catch (error) {
      throw new ExtError(`Unable to load builtin chain '${name}'`);
    }
  }

  return validateChain(
    fromDisk(name)
  );
};
