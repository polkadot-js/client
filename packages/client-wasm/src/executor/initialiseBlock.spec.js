// Copyright 2017-2018 @polkadot/client-wasm authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import createHeader from '@polkadot/primitives/create/header';
import encodeHeader from '@polkadot/primitives/codec/header/encode';
import HashDb from '@polkadot/client-db/Hash';
import MemoryDb from '@polkadot/client-db/Memory';

import init from '@polkadot/client-chains';

describe('initialiseBlock', () => {
  let chain;

  beforeEach(() => {
    const config = {
      chain: 'dev',
      wasm: {}
    };

    chain = init(config, new MemoryDb(), new HashDb());
  });

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
});
