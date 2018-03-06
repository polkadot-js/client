// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ChainConfigLoose } from '../types';

const path = require('path');

const ExtError = require('@polkadot/util/ext/error');

// chain is specified as '<something>.json', load file
module.exports = function loadFromDisk (name: string): ChainConfigLoose {
  try {
    // $FlowFixMe naughty, not a literal
    return require(name);
  } catch (error) {
    try {
      // $FlowFixMe naughty, not a literal
      return require(
        path.join(process.cwd(), name)
      );
    } catch (error) {
      throw new ExtError(`Unable to locate and load chain file '${name}'`);
    }
  }
};
