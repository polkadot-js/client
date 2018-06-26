// Copyright 2017-2018 @polkadot/client-wasm authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import memoryDb from '@polkadot/util-triedb/temp';
import methods from '@polkadot/extrinsics';
import encodeUnchecked from '@polkadot/extrinsics-codec/encode/unchecked';
import u8aConcat from '@polkadot/util/u8a/concat';
import testingPairs from '@polkadot/util-keyring/testingPairs';

import init from '@polkadot/client-chains';

const keyring = testingPairs();

const TIMESTAMP = new Uint8Array([
  111, 0, 0, 0,
  255,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  3, 0,
  49, 212, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
]);

const PARACHAIN = new Uint8Array([
  107, 0, 0, 0,
  255,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  8, 0,
  0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
]);

describe('generateBlock', () => {
  let chain;

  beforeEach(() => {
    const config = {
      chain: 'dev',
      wasm: {}
    };

    chain = init(config, memoryDb(), memoryDb());
  });

  it('generates a basic block (empty)', () => {
    expect(
      chain.executor.generateBlock([], 54321)
    ).toEqual(
      u8aConcat(
        new Uint8Array([
          27, 232, 237, 33, 3, 51, 112, 44, 133, 33, 8, 49, 146, 238, 217, 114, 216, 28, 16, 255, 124, 53, 209, 85, 192, 157, 181, 247, 78, 101, 19, 96,
          1, 0, 0, 0, 0, 0, 0, 0,
          221, 21, 132, 211, 98, 195, 203, 83, 253, 137, 89, 29, 178, 112, 43, 232, 89, 109, 203, 239, 7, 46, 177, 30, 165, 55, 139, 253, 175, 30, 124, 121, 242, 126, 54, 226, 138, 247, 180, 198, 17, 37, 45, 85, 75, 21, 97, 155, 220, 90, 128, 77, 179, 85, 27, 38, 219, 200, 37, 140, 53, 41, 4, 39,
          0, 0, 0, 0,
          2, 0, 0, 0
        ]),
        TIMESTAMP,
        PARACHAIN
      )
    );
  });

  it('generates a basic block (with real externals)', () => {
    expect(
      chain.executor.generateBlock([
        encodeUnchecked(keyring.alice, 0)(
          methods.staking.public.transfer,
          [keyring.bob.publicKey(), 69]
        )
      ])
    ).not.toBeNull();
  });

  it('generated blocks are importable', () => {
    expect(
      chain.executor.importBlock(
        chain.executor.generateBlock([])
      )
    ).not.toBeNull();
  });

  it('generated blocks are importable on top of each other', () => {
    expect(
      chain.executor.importBlock(
        chain.executor.generateBlock([])
      )
    ).not.toBeNull();
    expect(
      chain.executor.importBlock(
        chain.executor.generateBlock([])
      )
    ).not.toBeNull();
  });
});
