// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
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
