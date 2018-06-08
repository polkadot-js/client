// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const memoryDb = require('@polkadot/util-triedb/temp');
const methods = require('@polkadot/extrinsics');
const encodeUnchecked = require('@polkadot/extrinsics-codec/encode/unchecked');
const u8aConcat = require('@polkadot/util/u8a/concat');
const keyring = require('@polkadot/util-keyring/testingPairs')();

const init = require('@polkadot/client-chains');

const TIMESTAMP = new Uint8Array([
  110, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  3, 0,
  49, 212, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
]);

const PARACHAIN = new Uint8Array([
  106, 0, 0, 0,
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
          168, 135, 224, 93, 140, 222, 226, 83, 13, 116, 138, 197, 164, 6, 48, 190, 101, 18, 221, 166, 40, 179, 158, 112, 133, 154, 215, 198, 177, 76, 212, 228,
          1, 0, 0, 0, 0, 0, 0, 0,
          121, 74, 21, 213, 27, 99, 36, 2, 213, 140, 19, 40, 83, 147, 135, 138, 123, 17, 3, 171, 236, 38, 241, 171, 155, 206, 192, 65, 218, 235, 168, 107,
          56, 177, 6, 27, 224, 22, 144, 106, 231, 54, 62, 200, 53, 137, 191, 198, 220, 249, 141, 130, 37, 70, 142, 88, 70, 56, 95, 81, 241, 96, 89, 24,
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
