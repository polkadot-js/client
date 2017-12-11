// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { ChainConfigType } from './types';

const path = require('path');
const assert = require('@polkadot/util/assert');
const ExtError = require('@polkadot/util/ext/error');
const isString = require('@polkadot/util/is/string');

const validateChain = require('./validate');

module.exports = function loadChain (name: string): ChainConfigType {
  assert(isString(name), `Expected a chain name, received '${name}'`);

  let chain;

  // TODO: Instead of blindly requiring, we may want to check for the file existence and load it on when it is available (fs.statSync). Would still require some nested logic here (ugly), but could be more palettable since it is not nested try/catch blocks.
  // chain is specified as '<something>.json', load file
  if (/\.json$/.test(name)) {
    try {
      // try the file as an absolute path
      // $FlowFixMe naughty, not a literal
      chain = require(name);
    } catch (error) {
      try {
        // try the file as an relative path
        // $FlowFixMe naughty, not a literal
        chain = require(path.join(process.cwd(), name));
      } catch (error) {
        throw new ExtError(`Unable to locate and load chain file '${name}'`);
      }
    }
  } else {
    try {
      // try to load chain from the builtins
      // $FlowFixMe naughty, not a literal
      chain = require(`./chains/${name}.json`);
    } catch (error) {
      throw new ExtError(`Unable to load builtin chain '${name}'`);
    }
  }

  validateChain(chain);

  return chain;
};
