// Copyright 2017-2018 @polkadot/client-wasm authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import hexToU8a from '@polkadot/util/hex/toU8a';
import memoryDb from '@polkadot/util-triedb/temp';

import init from '@polkadot/client-chains';

describe.skip('executeBlock', () => {
  let chain;

  beforeEach(() => {
    const config = {
      chain: 'dev',
      wasm: {}
    };

    chain = init(config, memoryDb(), memoryDb());
  });

  it('executes an actual block', () => {
    expect(
      chain.executor.executeBlock(
        hexToU8a(
          '0x0d5522abf50c1049c56ae7db8b57adfc7e0237a508eddd885f13f93cf7c108c90100000000000000e13830b972ecbf60ccb46ca15fd8519e60478458c7703ad9c4c22e1255420d414e8ff6471166c3813314e034e0c40a028c85942a3a9995e93111cd6e18e91d0400000000020000006f000000ff00000000000000000000000000000000000000000000000000000000000000000000000003006d71375b00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006b000000ff00000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
        )
      )
    ).toEqual(true);
  });
});
