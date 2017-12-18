// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { ChainConfigType } from './types';

const path = require('path');

const ExtError = require('@polkadot/util/ext/error');

const validateChain = require('./validate');

// chain is specified as '<something>.json', load file
function loadFromDisk (name: string): ChainConfigType {
  try {
    // $FlowFixMe naughty, not a literal
    return require(name);
  } catch (error) {
    try {
      // $FlowFixMe naughty, not a literal
      return require(path.join(process.cwd(), name));
    } catch (error) {
      throw new ExtError(`Unable to locate and load chain file '${name}'`);
    }
  }
}

module.exports = function loadChain (name: string): ChainConfigType {
  // builtin?
  if (!/\.json$/.test(name)) {
    try {
      // $FlowFixMe naughty, not a literal
      return require(`./chains/${name}.json`);
    } catch (error) {
      throw new ExtError(`Unable to load builtin chain '${name}'`);
    }
  }

  return validateChain(
    loadFromDisk(name)
  );
};
