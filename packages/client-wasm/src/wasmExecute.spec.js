// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const encodeBlock = require('@polkadot/primitives-codec/block/encode');
const hexToU8a = require('@polkadot/util/hex/toU8a');

const { loadWasmExt } = require('../test/helpers');
const wasm = require('./wasm');

describe('wasm (runtimes)', () => {
  let instance;
  let config;
  let chain;
  let db;

  /*
  construct_block(
    1,
    [69u8; 32].into(),
    hex!("2481853da20b9f4322f34650fea5f240dcbfb266d02db94bfa0153c31f4a29db").into(),
    vec![Transaction {
      signed: Keyring::One.to_raw_public(),
      nonce: 0,
      function: Function::StakingTransfer(Keyring::Two.to_raw_public(), 69),
    }]
  )
  ([69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 1, 0, 0, 0, 0, 0, 0, 0, 36, 129, 133, 61, 162, 11, 159, 67, 34, 243, 70, 80, 254, 165, 242, 64, 220, 191, 178, 102, 208, 45, 185, 75, 250, 1, 83, 195, 31, 74, 41, 219, 219, 240, 37, 221, 74, 105, 166, 244, 238, 110, 21, 119, 178, 81, 182, 85, 9, 126, 41, 139, 105, 44, 179, 76, 24, 211, 24, 44, 172, 61, 224, 220, 0, 0, 0, 0, 1, 0, 0, 0, 145, 0, 0, 0, 47, 140, 97, 41, 216, 22, 207, 81, 195, 116, 188, 127, 8, 195, 230, 62, 209, 86, 207, 120, 174, 251, 74, 101, 80, 217, 123, 135, 153, 121, 119, 238, 0, 0, 0, 0, 0, 0, 0, 0, 34, 215, 90, 152, 1, 130, 177, 10, 183, 213, 75, 254, 211, 201, 100, 7, 58, 14, 225, 114, 243, 218, 166, 35, 37, 175, 2, 26, 104, 247, 7, 81, 26, 69, 0, 0, 0, 0, 0, 0, 0, 95, 152, 50, 197, 164, 163, 158, 45, 212, 163, 160, 197, 180, 0, 233, 131, 107, 235, 54, 44, 184, 247, 216, 69, 168, 41, 26, 42, 230, 254, 54, 102, 18, 224, 128, 228, 172, 208, 181, 167, 92, 61, 11, 110, 230, 150, 20, 166, 143, 182, 54, 152, 193, 231, 107, 241, 242, 220, 216, 250, 97, 125, 223, 5], 1025e5db74fdaf4d2818822dccf0e1604ae9ccc62f26cecfde23448ff0248abf)

  ([69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 1, 0, 0, 0, 0, 0, 0, 0, 36, 129, 133, 61, 162, 11, 159, 67, 34, 243, 70, 80, 254, 165, 242, 64, 220, 191, 178, 102, 208, 45, 185, 75, 250, 1, 83, 195, 31, 74, 41, 219, 86, 232, 31, 23, 27, 204, 85, 166, 255, 131, 69, 230, 146, 192, 248, 110, 91, 72, 224, 27, 153, 108, 173, 192, 1, 98, 47, 181, 227, 99, 180, 33, 0, 0, 0, 0, 0, 0, 0, 0], 8fe98a8c74087af8c7ae73d985045b9202272fc934b0608084c45c7f87fb2af5)
  */

  beforeEach(() => {
    config = {
      wasm: {}
    };
    chain = {
      params: {
        networkId: 42
      }
    };
    db = {
      pairs: () => []
    };

    instance = wasm(
      config,
      { chain, db },
      loadWasmExt('../../../../polkadot_runtime.compact.wasm')
      // loadWasmExt('polkadot_runtime.wasm')
    );
  });

  it('loads the actual runtime', () => {
    expect(
      instance.execute_block
    ).toBeDefined();
  });

  describe('testing', () => {
    it('runs', () => {
      expect(
        instance.testing_something(1, 2)
      ).toEqual(3);
    });
  });

  describe('execute_block', () => {
    it('executes a basic block', () => {
      // const block = encodeBlock({
      //   header: {
      //     parentHash: hexToU8a('0x4545454545454545454545454545454545454545454545454545454545454545'),
      //     number: 1,
      //     stateRoot: hexToU8a('0x2481853da20b9f4322f34650fea5f240dcbfb266d02db94bfa0153c31f4a29db'),
      //     transactionRoot: new Uint8Array([86, 232, 31, 23, 27, 204, 85, 166, 255, 131, 69, 230, 146, 192, 248, 110, 91, 72, 224, 27, 153, 108, 173, 192, 1, 98, 47, 181, 227, 99, 180, 33]),
      //     digest: {
      //       logs: []
      //     }
      //   },
      //   transactions: []
      // });
      //
      // expect(
      //   block
      // ).toEqual(
      //   new Uint8Array([
      //     69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69,
      //     1, 0, 0, 0, 0, 0, 0, 0,
      //     36, 129, 133, 61, 162, 11, 159, 67, 34, 243, 70, 80, 254, 165, 242, 64, 220, 191, 178, 102, 208, 45, 185, 75, 250, 1, 83, 195, 31, 74, 41, 219,
      //     86, 232, 31, 23, 27, 204, 85, 166, 255, 131, 69, 230, 146, 192, 248, 110, 91, 72, 224, 27, 153, 108, 173, 192, 1, 98, 47, 181, 227, 99, 180, 33,
      //     0, 0, 0, 0, 0, 0, 0, 0
      //   ])
      // );

      expect(
        instance.execute_block(
          hexToU8a('0x454545454545454545454545454545454545454545454545454545454545454501000000000000002481853da20b9f4322f34650fea5f240dcbfb266d02db94bfa0153c31f4a29dbdbf025dd4a69a6f4ee6e1577b251b655097e298b692cb34c18d3182cac3de0dc0000000001000000910000002f8c6129d816cf51c374bc7f08c3e63ed156cf78aefb4a6550d97b87997977ee000000000000000022d75a980182b10ab7d54bfed3c964073a0ee172f3daa62325af021a68f707511a45000000000000005f9832c5a4a39e2dd4a3a0c5b400e9836beb362cb8f7d845a8291a2ae6fe366612e080e4acd0b5a75c3d0b6ee69614a68fb63698c1e76bf1f2dcd8fa617ddf05')
        )
      ).toBeDefined();
    });
  });
});
