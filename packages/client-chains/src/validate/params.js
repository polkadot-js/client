// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ChainConfigType$Params } from '../types';

const assert = require('@polkadot/util/assert');

const validateObject = require('./object');

const KNOWN_KEYS = ['networkId'];
const PREFIX = 'Chain.params';

module.exports = function validateParams (params: ChainConfigType$Params, strict: boolean = false): boolean {
  validateObject(PREFIX, params, KNOWN_KEYS, strict);

  assert(Number.isInteger(params.networkId), `${PREFIX}.networkId should be an integer`);

  return true;
};

module.exports.KNOWN_KEYS = KNOWN_KEYS;
