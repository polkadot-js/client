// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ChainConfigLoose } from '../../types';

const validateObject = require('./object');
const validateParams = require('./params');

const CHAIN_KNOWN_KEYS = ['blockTime', 'description', 'genesis', 'name', 'networkId', 'nodes', 'type'];
const GENESIS_KNOWN_KEYS = ['authorities', 'balances', 'code', 'params', 'validators'];

module.exports = function validateChain (chain: ChainConfigLoose, strict: boolean = false): ChainConfigLoose {
  validateObject('Chain', chain, CHAIN_KNOWN_KEYS, strict);
  validateObject('Genesis', chain.genesis, GENESIS_KNOWN_KEYS, strict);
  validateParams(chain.genesis.params);

  return chain;
};

module.exports.CHAIN_KNOWN_KEYS = CHAIN_KNOWN_KEYS;
module.exports.GENESIS_KNOWN_KEYS = GENESIS_KNOWN_KEYS;
