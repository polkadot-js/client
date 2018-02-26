// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ChainConfigType$Number } from '../types';

const assert = require('@polkadot/util/assert');
const isBn = require('@polkadot/util/is/bn');
const isHex = require('@polkadot/util/is/hex');

const validateObject = require('./object');

const KNOWN_KEYS = ['approvalRatio', 'blockTime', 'bondingDuration', 'networkId', 'sessionLength', 'sessionsPerEra'];
const PREFIX = 'Chain.params';

// flowlint-next-line unclear-type:off
function isNumber (value: any): boolean {
  return Number.isInteger(value) || isBn(value) || isHex(value);
}

module.exports = function validateParams (params: { [string]: ChainConfigType$Number }, strict: boolean = false): boolean {
  validateObject(PREFIX, params, KNOWN_KEYS, strict);

  KNOWN_KEYS.forEach((key) => {
    assert(isNumber(params[key]), `${PREFIX}.${key} should be an integer, BN or hex string`);
  });

  return true;
};

module.exports.KNOWN_KEYS = KNOWN_KEYS;
