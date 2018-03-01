// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { PolkadotBlockDb } from '../types';
import type { CallCreatorU8a } from './types';

const decodeHeader = require('@polkadot/primitives-codec/blockHeader/decodePartial');
const blake2Asu8a256 = require('@polkadot/util-crypto/blake2/asU8a256');

const executeBlock = require('./executeBlock');

module.exports = function importBlock (createCaller: CallCreatorU8a, stateDb: PolkadotStateDb, blockDb: PolkadotBlockDb, block: Uint8Array): boolean {
  const result = executeBlock(createCaller, block);

  if (!result) {
    return false;
  }

  stateDb.commit();

  const { data, header } = decodeHeader(block);
  const hash = blake2Asu8a256(data);

  console.log('decoded', data, hash);

  blockDb.setBlock(hash, block);
  blockDb.setLatestNumber(header.number);
  blockDb.setLatestHash(hash);

  return true;
};
