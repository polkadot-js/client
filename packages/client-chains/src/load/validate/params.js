// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ChainConfigLoose$Number } from '../../types';

const assert = require('@polkadot/util/assert');
const isBn = require('@polkadot/util/is/bn');
const isHex = require('@polkadot/util/is/hex');

// flowlint-next-line unclear-type:off
function isNumber (value: any): boolean {
  return Number.isInteger(value) || isBn(value) || isHex(value);
}

module.exports = function validateParams (params: { [string]: ChainConfigLoose$Number }): boolean {
  Object.keys(params).forEach((key) => {
    assert(isNumber(params[key]), `Genesis.params.${key} should be an integer, BN or hex string`);
  });

  return true;
};
