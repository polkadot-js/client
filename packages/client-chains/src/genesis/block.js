// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ChainState, ChainGenesis } from '../types';

const createBlock = require('@polkadot/primitives-builder/block');
const encodeHeader = require('@polkadot/primitives-codec/header/encode');
const hexToU8a = require('@polkadot/util/hex/toU8a');
const blake2Asu8a = require('@polkadot/util-crypto/blake2/asU8a');
const trieRoot = require('@polkadot/util-triehash/root');

// FIXME We probably want to hash, but _should_ be pretty "safe"
const CODE_KEY = hexToU8a('0x3a636f6465');

module.exports = function genesisBlock ({ stateDb: { db }, chain }: ChainState): ChainGenesis {
  const block = createBlock({
    header: {
      stateRoot: db.trieRoot(),
      extrinsicsRoot: trieRoot([])
    }
  });
  const header = encodeHeader(block.header);
  const headerHash = blake2Asu8a(header, 256);
  const code = db.get(CODE_KEY);
  const codeHash = blake2Asu8a(code, 256);

  return {
    code,
    codeHash,
    header: block.header,
    headerHash
  };
};
