// Copyright 2017-2018 @polkadot/client-wasm authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import createHeader from '@polkadot/primitives/create/header';
import encodeHeader from '@polkadot/primitives/codec/header/encode';
import HashDb from '@polkadot/client-db/Hash/Memory';
import MemoryDb from '@polkadot/client-db/Trie/Memory';

import Chain from '@polkadot/client-chains';

describe('initialiseBlock', () => {
  const config = {
    chain: 'dev',
    wasm: {}
  };
  const stateDb = new MemoryDb();
  const chain = new Chain(config, stateDb, new HashDb());

  it('initialises a block', () => {
    expect(
      chain.executor.initialiseBlock(
        encodeHeader(
          createHeader({
            number: 1,
            extrinsicsRoot: new Uint8Array(32)
          })
        )
      )
    ).toEqual(true);
  });

  it('terminates', () => {
    return stateDb.terminate();
  });
});
