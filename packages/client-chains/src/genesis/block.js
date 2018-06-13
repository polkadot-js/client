// Copyright 2017-2018 @polkadot/client-chains authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ChainState, ChainGenesis } from '../types';

const createBlock = require('@polkadot/primitives-builder/block');
const encodeBlock = require('@polkadot/primitives-codec/block/encode');
const encodeHeader = require('@polkadot/primitives-codec/header/encode');
const storage = require('@polkadot/storage');
const key = require('@polkadot/storage/key');
const blake2Asu8a = require('@polkadot/util-crypto/blake2/asU8a');
const trieRoot = require('@polkadot/util-triehash/root');

const CODE_KEY = key(storage.consensus.public.code)();

module.exports = function genesisBlock ({ stateDb: { db }, chain }: ChainState): ChainGenesis {
  const code = db.get(CODE_KEY);

  if (code === null) {
    throw new Error('Unable to retrieve genesis code');
  }

  const codeHash = blake2Asu8a(code, 256);
  const block = createBlock({
    header: {
      stateRoot: db.trieRoot(),
      extrinsicsRoot: trieRoot([])
    }
  });
  const header = encodeHeader(block.header);
  const headerHash = blake2Asu8a(header, 256);

  return {
    block: encodeBlock(block),
    code,
    codeHash,
    header: block.header,
    headerHash
  };
};
