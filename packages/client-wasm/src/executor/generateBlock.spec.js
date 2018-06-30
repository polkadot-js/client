// Copyright 2017-2018 @polkadot/client-wasm authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import memoryDb from '@polkadot/util-triedb/temp';
import methods from '@polkadot/extrinsics';
import encodeUnchecked from '@polkadot/extrinsics/codec/encode/unchecked';
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
          13, 85, 34, 171, 245, 12, 16, 73, 197, 106, 231, 219, 139, 87, 173, 252, 126, 2, 55, 165, 8, 237, 221, 136, 95, 19, 249, 60, 247, 193, 8, 201,
          1, 0, 0, 0, 0, 0, 0, 0,
          239, 226, 65, 116, 218, 12, 167, 93, 171, 115, 41, 253, 171, 14, 223, 200, 49, 191, 208, 179, 104, 46, 18, 36, 222, 14, 1, 90, 121, 193, 46, 240,
          242, 126, 54, 226, 138, 247, 180, 198, 17, 37, 45, 85, 75, 21, 97, 155, 220, 90, 128, 77, 179, 85, 27, 38, 219, 200, 37, 140, 53, 41, 4, 39,
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

  // NOTE Timestamps now check for elapsed times
  it('generated blocks are importable on top of each other', () => {
    expect(
      chain.executor.importBlock(
        chain.executor.generateBlock([], 54321)
      )
    ).not.toBeNull();
    expect(
      chain.executor.importBlock(
        chain.executor.generateBlock([], 54321 + 10)
      )
    ).not.toBeNull();
  });
});
