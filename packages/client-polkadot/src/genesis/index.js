// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ChainConfigType, ChainInterface$Genesis } from '@polkadot/client-chains/types';
import type { PolkadotDb } from '../types';

const encodeHeader = require('@polkadot/primitives-codec/blockHeader/encode');
const blake2Asu8a256 = require('@polkadot/util-crypto/blake2/asU8a256');

const initBlock = require('./block');
const initState = require('./state');

module.exports = function genesis (chain: ChainConfigType, db: PolkadotDb): ChainInterface$Genesis {
  initState(chain, db);

  const header = encodeHeader(initBlock(chain, db).header);
  const hash = blake2Asu8a256(header);

  return {
    header,
    hash
  };
};
