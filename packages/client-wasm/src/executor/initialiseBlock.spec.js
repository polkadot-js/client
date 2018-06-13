// Copyright 2017-2018 @polkadot/client-wasm authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const createHeader = require('@polkadot/primitives-builder/header');
const encodeHeader = require('@polkadot/primitives-codec/header/encode');
const memoryDb = require('@polkadot/util-triedb/temp');

const init = require('@polkadot/client-chains');

describe('initialiseBlock', () => {
  let chain;

  beforeEach(() => {
    const config = {
      chain: 'dev',
      wasm: {}
    };

    chain = init(config, memoryDb(), memoryDb());
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
