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
          146, 38, 162, 251, 223, 62, 233, 6, 37, 13, 91, 144, 4, 83, 185, 88, 136, 237, 195, 199, 164, 34, 13, 227, 172, 12, 186, 13, 208, 21, 160, 233,
          1, 0, 0, 0, 0, 0, 0, 0,
          42, 12, 90, 250, 172, 163, 146, 236, 11, 83, 95, 204, 40, 61, 41, 99, 228, 68, 30, 59, 119, 21, 76, 162, 118, 179, 196, 215, 163, 38, 145, 114, 242, 126, 54, 226, 138, 247, 180, 198, 17, 37, 45, 85, 75, 21, 97, 155, 220, 90, 128, 77, 179, 85, 27, 38, 219, 200, 37, 140, 53, 41, 4, 39,
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
