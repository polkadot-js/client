// ISC, Copyright 2017-2018 Jaco Greeff
// @flow

import type { ChainConfigType } from '../types';

const validateGenesis = require('./genesis');
const validateObject = require('./object');
const validateParams = require('./params');

const KNOWN_KEYS = ['description', 'genesis', 'name', 'nodes', 'params'];

module.exports = function validateChain (chain: ChainConfigType, strict: boolean = false): ChainConfigType {
  validateObject('Chain', chain, KNOWN_KEYS, strict);
  validateGenesis(chain.genesis, strict);
  validateParams(chain.params, strict);

  return chain;
};

module.exports.KNOWN_KEYS = KNOWN_KEYS;
