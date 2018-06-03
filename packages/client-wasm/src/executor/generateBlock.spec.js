// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const extrinsics = require('@polkadot/extrinsics');
const encodeSigned = require('@polkadot/extrinsics-codec/encode/sign');
const hexToU8a = require('@polkadot/util/hex/toU8a');
const memoryDb = require('@polkadot/client-db/memory');
const keyring = require('@polkadot/util-keyring/testingPairs')();

const init = require('@polkadot/client-chains');

describe('generateBlock', () => {
  let executor;

  beforeEach(() => {
    const config = {
      chain: 'dev',
      wasm: {}
    };

    executor = init(config, memoryDb(), memoryDb()).executor;
  });

  it.only('generates a basic block (empty)', () => {
    expect(
      executor.generateBlock(1, [], 54321)
    ).toEqual(
      new Uint8Array([
        168, 135, 224, 93, 140, 222, 226, 83, 13, 116, 138, 197, 164, 6, 48, 190, 101, 18, 221, 166, 40, 179, 158, 112, 133, 154, 215, 198, 177, 76, 212, 228,
        1, 0, 0, 0, 0, 0, 0, 0,
        121, 74, 21, 213, 27, 99, 36, 2, 213, 140, 19, 40, 83, 147, 135, 138, 123, 17, 3, 171, 236, 38, 241, 171, 155, 206, 192, 65, 218, 235, 168, 107,
        45, 13, 88, 141, 44, 90, 234, 105, 43, 229, 18, 111, 140, 14, 4, 97, 216, 194, 91, 87, 159, 112, 218, 53, 254, 124, 199, 181, 82, 169, 186, 95,
        0, 0, 0, 0,
        2, 0, 0, 0,
        110, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 49, 212, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        106, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
      ])
    );
  });

  it('generates a basic block', () => {
    expect(
      executor.generateBlock(1, [
        encodeSigned(keyring.one, 0)(
          extrinsics.staking.public.transfer,
          [keyring.two.publicKey(), 69]
        )
      ], 54321)
    ).toEqual(
      hexToU8a(
        '0x' +
        '4545454545454545454545454545454545454545454545454545454545454545' +
        '0100000000000000' +
        'eb59a2a2c51e70601f8bb5f99087d44d0af3297f9ed576b30ba66cd449f2720a' +
        'ba73ce9e83f1c051f815ade5309f4469686ba3ea21ef9745b5fb3fffed81e7a7' +
        '00000000' +
        // 2 txs
        '02000000'
      )
    );
  });

  it('generated blocks are importable', () => {
    const block = executor.generateBlock(1, [
      encodeSigned(keyring.one, 0)(
        extrinsics.staking.public.transfer,
        [keyring.two.publicKey(), 69]
      )
    ]);

    expect(
      executor.importBlock(block)
    ).not.toBeNull();
  });

  it('blocks are importable on top of previous', () => {
    executor.importBlock(
      executor.generateBlock(1, [
        encodeSigned(keyring.one, 0)(
          extrinsics.staking.public.transfer,
          [keyring.two.publicKey(), 69]
        )
      ])
    );

    const block = executor.generateBlock(2, [
      encodeSigned(keyring.t2o, 0)(
        extrinsics.staking.public.transfer,
        [keyring.one.publicKey(), 5]
      )
    ]);

    expect(
      executor.importBlock(block)
    ).not.toBeNull();
  });
});
