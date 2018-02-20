// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

// const encodeBlock = require('@polkadot/primitives-codec/block/encode');
const hexToU8a = require('@polkadot/util/hex/toU8a');
const memoryDb = require('@polkadot/client-db/memory');

const wasm = require('./polkadot');
const code = require('../test/wasm/polkadot_runtime_wasm');

describe('polkadot (runtimes)', () => {
  let instance;
  let config;
  let chain;
  let db;
  let getStorage;
  let setStorage;

  beforeEach(() => {
    config = {
      wasm: {}
    };
    chain = {
      params: {
        networkId: 42
      }
    };
    db = memoryDb();

    instance = wasm(config, { chain, db }, code);

    getStorage = instance.runtime.environment.storage.get;
    setStorage = instance.runtime.environment.storage.set;
  });

  it('loads the actual runtime', () => {
    expect(
      instance.exports.execute_block
    ).toBeDefined();
  });

  describe('execute_transaction', () => {
    beforeEach(() => {
      setStorage(
        new Uint8Array([209, 171, 83, 92, 36, 46, 52, 24, 171, 77, 162, 203, 90, 170, 128, 166]),
        new Uint8Array([(69 + 42), 0, 0, 0, 0, 0, 0, 0])
      );
    });

    it('executes a basic transaction', () => {
      instance.exports.execute_transaction(
        hexToU8a('0x000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000910000002f8c6129d816cf51c374bc7f08c3e63ed156cf78aefb4a6550d97b87997977ee000000000000000022d75a980182b10ab7d54bfed3c964073a0ee172f3daa62325af021a68f707511a45000000000000005f9832c5a4a39e2dd4a3a0c5b400e9836beb362cb8f7d845a8291a2ae6fe366612e080e4acd0b5a75c3d0b6ee69614a68fb63698c1e76bf1f2dcd8fa617ddf05')
      );

      expect(
        getStorage(
          hexToU8a('0xd1ab535c242e3418ab4da2cb5aaa80a6')
        )
      ).toEqual(
        new Uint8Array([42, 0, 0, 0, 0, 0, 0, 0])
      );
      expect(
        getStorage(
          hexToU8a('0xb51ac18fd0242fd7fd033de43fd2940f')
        )
      ).toEqual(
        new Uint8Array([69, 0, 0, 0, 0, 0, 0, 0])
      );
    });
  });

  describe.skip('execute_block', () => {
    beforeEach(() => {
      setStorage(
        new Uint8Array([227, 27, 90, 220, 100, 62, 66, 228, 126, 109, 210, 39, 74, 56, 186, 92]),
        new Uint8Array([155, 2, 0, 0])
      );
      setStorage(
        new Uint8Array([209, 171, 83, 92, 36, 46, 52, 24, 171, 77, 162, 203, 90, 170, 128, 166]),
        new Uint8Array([111, 0, 0, 0, 0, 0, 0, 0])
      );
      setStorage(
        new Uint8Array([74, 215, 5, 152, 26, 184, 197, 20, 148, 83, 182, 214, 54, 193, 144, 48]),
        new Uint8Array([47, 140, 97, 41, 216, 22, 207, 81, 195, 116, 188, 127, 8, 195, 230, 62, 209, 86, 207, 120, 174, 251, 74, 101, 80, 217, 123, 135, 153, 121, 119, 238])
      );
      setStorage(
        new Uint8Array([173, 131, 186, 108, 113, 203, 161, 69, 135, 211, 123, 231, 166, 36, 173, 128]),
        new Uint8Array([69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69])
      );
      setStorage(
        new Uint8Array([188, 93, 14, 33, 249, 40, 238, 172, 61, 208, 176, 90, 20, 29, 55, 223]),
        new Uint8Array([3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3])
      );
      setStorage(
        new Uint8Array([157, 210, 64, 19, 228, 146, 189, 187, 53, 68, 251, 160, 103, 52, 186, 247]),
        new Uint8Array([2, 0, 0, 0, 0, 0, 0, 0])
      );
      setStorage(
        new Uint8Array([11, 131, 44, 74, 180, 231, 189, 216, 164, 122, 140, 77, 105, 137, 189, 231]),
        new Uint8Array([3, 0, 0, 0])
      );
      setStorage(
        new Uint8Array([3, 121, 200, 224, 48, 161, 59, 149, 150, 206, 96, 235, 245, 25, 110, 169]),
        new Uint8Array([3, 0, 0, 0])
      );
      setStorage(
        new Uint8Array([194, 31, 127, 33, 171, 6, 99, 233, 182, 141, 213, 146, 43, 51, 169, 244]),
        new Uint8Array([215, 90, 152, 1, 130, 177, 10, 183, 213, 75, 254, 211, 201, 100, 7, 58, 14, 225, 114, 243, 218, 166, 35, 37, 175, 2, 26, 104, 247, 7, 81, 26])
      );
      setStorage(
        new Uint8Array([69, 43, 85, 12, 130, 93, 53, 142, 66, 96, 18, 54, 165, 41, 226, 237]),
        new Uint8Array([3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3])
      );
      setStorage(
        new Uint8Array([59, 112, 6, 135, 254, 205, 255, 94, 193, 196, 165, 183, 20, 82, 30, 182]),
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0])
      );
      setStorage(
        new Uint8Array([243, 125, 44, 38, 198, 149, 59, 24, 135, 141, 188, 29, 198, 94, 219, 192]),
        new Uint8Array([2, 0, 0, 0, 0, 0, 0, 0])
      );
      setStorage(
        new Uint8Array([162, 202, 229, 105, 184, 14, 224, 88, 11, 41, 104, 35, 55, 4, 93, 0]),
        new Uint8Array([215, 90, 152, 1, 130, 177, 10, 183, 213, 75, 254, 211, 201, 100, 7, 58, 14, 225, 114, 243, 218, 166, 35, 37, 175, 2, 26, 104, 247, 7, 81, 26])
      );
      setStorage(
        new Uint8Array([41, 48, 212, 112, 57, 112, 101, 173, 231, 171, 105, 95, 166, 156, 45, 141]),
        new Uint8Array([47, 140, 97, 41, 216, 22, 207, 81, 195, 116, 188, 127, 8, 195, 230, 62, 209, 86, 207, 120, 174, 251, 74, 101, 80, 217, 123, 135, 153, 121, 119, 238])
      );
      setStorage(
        new Uint8Array([160, 89, 174, 59, 62, 247, 37, 114, 30, 151, 69, 38, 66, 128, 59, 97]),
        new Uint8Array([3, 0, 0, 0, 0, 0, 0, 0])
      );
    });

    it('executes a basic block', () => {
      expect(
        instance.exports.execute_block(
          hexToU8a('0x1025e5db74fdaf4d2818822dccf0e1604ae9ccc62f26cecfde23448ff0248abf02000000000000001feb4d3a2e587079e6ce1685fa79994efd995e33cb289d39cded67aac1bb46a900d8a0c8ff582dc27623a82c88e1c44a5735c6f2657c26a26064114fb4e7cbfd000000000200000091000000d75a980182b10ab7d54bfed3c964073a0ee172f3daa62325af021a68f707511a0000000000000000222f8c6129d816cf51c374bc7f08c3e63ed156cf78aefb4a6550d97b87997977ee05000000000000001a292d71129e96e30552ca9f5c8583a5f236aae8415e3fd62ff55d7274d66e805ef7a69332fdddde84fee8c3ca62fc3742e9325fa9c62b93ef2433cb395f350c910000002f8c6129d816cf51c374bc7f08c3e63ed156cf78aefb4a6550d97b87997977ee010000000000000022d75a980182b10ab7d54bfed3c964073a0ee172f3daa62325af021a68f707511a0f00000000000000e178173342922ad27a3fd664f239e00dd90a68d3daea076c3fd5a6e36be4b105bd30442d2b0c13533022319c512df38443dda3eab9dff6e16e0103b81bf5c50a')
        )
      ).toBeDefined();
    });
  });
});

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
