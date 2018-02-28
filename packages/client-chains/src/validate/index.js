// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ChainConfigTypeLoose } from '../types';

const validateObject = require('./object');
const validateParams = require('./params');

const KNOWN_KEYS = ['authorities', 'balances', 'code', 'description', 'name', 'nodes', 'params', 'type', 'validators'];

module.exports = function validateChain (chain: ChainConfigTypeLoose, strict: boolean = false): ChainConfigTypeLoose {
  validateObject('Chain', chain, KNOWN_KEYS, strict);
  validateParams(chain.params, strict);

  return chain;
};

module.exports.KNOWN_KEYS = KNOWN_KEYS;
