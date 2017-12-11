// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { ChainConfigType$Params } from '../types';

const assert = require('@polkadot/util/assert');
const isHex = require('@polkadot/util/is/hex');

const validateObject = require('./object');

const KNOWN_KEYS = ['networkID'];
const PREFIX = 'Chain.params';

module.exports = function validateParams (params: ChainConfigType$Params, strict: boolean = false): boolean {
  validateObject(PREFIX, params, KNOWN_KEYS, strict);

  assert(isHex(params.networkID), `${PREFIX}.networkID should be a hex number`);

  return true;
};

module.exports.KNOWN_KEYS = KNOWN_KEYS;
