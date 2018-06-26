// Copyright 2017-2018 @polkadot/client-chains authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { ChainState, ChainGenesis } from '../types';

import createBlock from '@polkadot/primitives-builder/block';
import encodeBlock from '@polkadot/primitives-codec/block/encode';
import encodeHeader from '@polkadot/primitives-codec/header/encode';
import storage from '@polkadot/storage';
import key from '@polkadot/storage/key';
import blake2Asu8a from '@polkadot/util-crypto/blake2/asU8a';
import trieRoot from '@polkadot/util-triehash/root';

const CODE_KEY = key(storage.consensus.public.code)();

export default function genesisBlock ({ stateDb: { db } }: ChainState): ChainGenesis {
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
}
