// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ChainState } from '../types';

const createBlock = require('@polkadot/primitives-builder/block');
const encodeHeader = require('@polkadot/primitives-codec/header/encode');
const blake2Asu8a256 = require('@polkadot/util-crypto/blake2/asU8a256');
const trieRoot = require('@polkadot/util-triehash/root');

module.exports = function genesisBlock ({ stateDb, chain }: ChainState): void {
  const block = createBlock({
    header: {
      stateRoot: stateDb.trieRoot(),
      transactionRoot: trieRoot([])
    }
  });
  const header = encodeHeader(block.header);
  const hash = blake2Asu8a256(header);

  chain.genesis.block = {
    header,
    hash
  };
};
