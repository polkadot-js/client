// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const extrinsics = require('@polkadot/extrinsics');
const encodeUnchecked = require('@polkadot/extrinsics-codec/encode/unchecked');
const hexToU8a = require('@polkadot/util/hex/toU8a');
const memoryDb = require('@polkadot/client-db/memory');
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
      chain.executor.generateBlock(1, [], 54321)
    ).toEqual(
      u8aConcat(
        new Uint8Array([
          168, 135, 224, 93, 140, 222, 226, 83, 13, 116, 138, 197, 164, 6, 48, 190, 101, 18, 221, 166, 40, 179, 158, 112, 133, 154, 215, 198, 177, 76, 212, 228,
          1, 0, 0, 0, 0, 0, 0, 0,
          121, 74, 21, 213, 27, 99, 36, 2, 213, 140, 19, 40, 83, 147, 135, 138, 123, 17, 3, 171, 236, 38, 241, 171, 155, 206, 192, 65, 218, 235, 168, 107,
          45, 13, 88, 141, 44, 90, 234, 105, 43, 229, 18, 111, 140, 14, 4, 97, 216, 194, 91, 87, 159, 112, 218, 53, 254, 124, 199, 181, 82, 169, 186, 95,
          0, 0, 0, 0,
          2, 0, 0, 0
        ]),
        TIMESTAMP,
        PARACHAIN
      )
    );
  });

  it('generates a basic block', () => {
    expect(
      chain.executor.generateBlock(1, [
        encodeUnchecked(keyring.one, 0)(
          extrinsics.staking.public.transfer,
          [keyring.two.publicKey(), 69]
        )
      ], 54321)
    ).toEqual(
      u8aConcat(
        chain.state.system.blockHashAt.get(0),
        hexToU8a('0x0100000000000000'),
        new Uint8Array([
          171, 35, 167, 107, 40, 54, 180, 84, 164, 54, 148, 34, 219, 225, 194, 236, 205, 235, 24, 112, 125, 0, 214, 55, 56, 192, 104, 206, 150, 219, 79, 120
        ]),
        new Uint8Array([
          45, 13, 88, 141, 44, 90, 234, 105, 43, 229, 18, 111, 140, 14, 4, 97, 216, 194, 91, 87, 159, 112, 218, 53, 254, 124, 199, 181, 82, 169, 186, 95
        ]),
        hexToU8a('0x0000000003000000'),
        TIMESTAMP,
        PARACHAIN,
        new Uint8Array([
          150, 0, 0, 0,
          47, 140, 97, 41, 216, 22, 207, 81, 195, 116, 188, 127, 8, 195, 230, 62, 209, 86, 207, 120, 174, 251, 74, 101, 80, 217, 123, 135, 153, 121, 119, 238,
          0, 0, 0, 0,
          2, 0,
          215, 90, 152, 1, 130, 177, 10, 183, 213, 75, 254, 211, 201, 100, 7, 58, 14, 225, 114, 243, 218, 166, 35, 37, 175, 2, 26, 104, 247, 7, 81, 26,
          69, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          130, 56, 171, 54, 170, 30, 182, 239, 93, 60, 36, 201, 188, 19, 244, 89, 105, 180, 49, 82, 13, 251, 5, 117, 191, 8, 106, 62, 24, 170, 136, 100, 129, 131, 67, 223, 236, 146, 115, 147, 65, 54, 240, 79, 178, 47, 163, 28, 55, 208, 68, 180, 110, 70, 68, 190, 7, 216, 127, 240, 59, 189, 253, 9
        ])
      )
    );
  });

  it('generated blocks are importable', () => {
    const block = chain.executor.generateBlock(1, [
      encodeUnchecked(keyring.one, 0)(
        extrinsics.staking.public.transfer,
        [keyring.two.publicKey(), 69]
      )
    ]);

    expect(
      chain.executor.importBlock(block)
    ).toEqual({});
  });
});
