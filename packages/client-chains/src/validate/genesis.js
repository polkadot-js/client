// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { ChainConfigType$Genesis } from '../types';

const assert = require('@polkadot/util/assert');
const isHex = require('@polkadot/util/is/hex');

const validateObject = require('./object');

const KNOWN_KEYS = ['author', 'hash', 'parentHash', 'stateRoot'];
const PREFIX = 'Chain.genesis';

module.exports = function validateGenesis (genesis: ChainConfigType$Genesis, strict: boolean = false): boolean {
  validateObject(PREFIX, genesis, KNOWN_KEYS, strict);

  assert(isHex(genesis.author, 160), `${PREFIX}.author should be AccountId`);
  assert(isHex(genesis.hash, 256), `${PREFIX}.hash should be a HeaderHash`);
  assert(isHex(genesis.parentHash, 256), `${PREFIX}.parentHash should be HeaderHash`);
  assert(isHex(genesis.stateRoot, 256), `${PREFIX}.stateRoot should be Hash`);

  return true;
};

module.exports.KNOWN_KEYS = KNOWN_KEYS;
