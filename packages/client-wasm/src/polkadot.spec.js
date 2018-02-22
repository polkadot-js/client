// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

// const encodeBlock = require('@polkadot/primitives-codec/block/encode');
const hexToU8a = require('@polkadot/util/hex/toU8a');
const memoryDb = require('@polkadot/client-db/memory');
const createPolkadot = require('@polkadot/client-polkadot');
const keyring = require('@polkadot/client-keyring/testing')();

const wasm = require('./polkadot');
const code = require('../test/wasm/polkadot_runtime_wasm');

describe('polkadot (runtimes)', () => {
  let instance;
  let config;
  let chain;
  let db;
  let polkadot;

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
    polkadot = createPolkadot(instance.runtime.environment.storage);
  });

  beforeEach(() => {
    polkadot.staking.setBalance(keyring.one.publicKey, 69 + 42);
  });

  it('loads the actual runtime', () => {
    expect(
      instance.exports.execute_block
    ).toBeDefined();
  });

  describe('execute_transaction', () => {
    it('executes a basic transaction', () => {
      instance.exports.execute_transaction(
        hexToU8a('0x000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000910000002f8c6129d816cf51c374bc7f08c3e63ed156cf78aefb4a6550d97b87997977ee000000000000000022d75a980182b10ab7d54bfed3c964073a0ee172f3daa62325af021a68f707511a45000000000000005f9832c5a4a39e2dd4a3a0c5b400e9836beb362cb8f7d845a8291a2ae6fe366612e080e4acd0b5a75c3d0b6ee69614a68fb63698c1e76bf1f2dcd8fa617ddf05')
      );

      expect(
        polkadot.staking.getBalance(keyring.one.publicKey).toNumber()
      ).toEqual(42);
      expect(
        polkadot.staking.getBalance(keyring.two.publicKey).toNumber()
      ).toEqual(69);
    });
  });

  describe('execute_block', () => {
    beforeEach(() => {
      const threePublicKey = hexToU8a('0x0303030303030303030303030303030303030303030303030303030303030303');

      polkadot.governance.setApprovalsRequired(667);
      polkadot.session.setLength(2);
      polkadot.session.setValueLength(3);
      polkadot.session.setValue(0, keyring.one.publicKey);
      polkadot.session.setValue(1, keyring.two.publicKey);
      polkadot.session.setValue(2, threePublicKey);
      polkadot.staking.setCurrentEra(0);
      polkadot.staking.setIntentLength(3);
      polkadot.staking.setIntent(0, keyring.one.publicKey);
      polkadot.staking.setIntent(1, keyring.two.publicKey);
      polkadot.staking.setIntent(2, threePublicKey);
      polkadot.staking.setSessionsPerEra(2);
      polkadot.staking.setValidatorCount(3);
      polkadot.system.setBlockHash(0, hexToU8a('0x4545454545454545454545454545454545454545454545454545454545454545'));
    });

    it('executes a basic block', () => {
      // block1
      instance.exports.execute_block(
        hexToU8a('0x454545454545454545454545454545454545454545454545454545454545454501000000000000002481853da20b9f4322f34650fea5f240dcbfb266d02db94bfa0153c31f4a29dbdbf025dd4a69a6f4ee6e1577b251b655097e298b692cb34c18d3182cac3de0dc0000000001000000910000002f8c6129d816cf51c374bc7f08c3e63ed156cf78aefb4a6550d97b87997977ee000000000000000022d75a980182b10ab7d54bfed3c964073a0ee172f3daa62325af021a68f707511a45000000000000005f9832c5a4a39e2dd4a3a0c5b400e9836beb362cb8f7d845a8291a2ae6fe366612e080e4acd0b5a75c3d0b6ee69614a68fb63698c1e76bf1f2dcd8fa617ddf05')
      );

      expect(
        polkadot.staking.getBalance(keyring.one.publicKey).toNumber()
      ).toEqual(42);
      expect(
        polkadot.staking.getBalance(keyring.two.publicKey).toNumber()
      ).toEqual(69);
      expect(
        polkadot.system.getBlockHash(1)
      ).toEqual(
        hexToU8a('0x1025e5db74fdaf4d2818822dccf0e1604ae9ccc62f26cecfde23448ff0248abf')
      );

      // block2
      instance.exports.execute_block(
        hexToU8a('0x1025e5db74fdaf4d2818822dccf0e1604ae9ccc62f26cecfde23448ff0248abf02000000000000001feb4d3a2e587079e6ce1685fa79994efd995e33cb289d39cded67aac1bb46a900d8a0c8ff582dc27623a82c88e1c44a5735c6f2657c26a26064114fb4e7cbfd000000000200000091000000d75a980182b10ab7d54bfed3c964073a0ee172f3daa62325af021a68f707511a0000000000000000222f8c6129d816cf51c374bc7f08c3e63ed156cf78aefb4a6550d97b87997977ee05000000000000001a292d71129e96e30552ca9f5c8583a5f236aae8415e3fd62ff55d7274d66e805ef7a69332fdddde84fee8c3ca62fc3742e9325fa9c62b93ef2433cb395f350c910000002f8c6129d816cf51c374bc7f08c3e63ed156cf78aefb4a6550d97b87997977ee010000000000000022d75a980182b10ab7d54bfed3c964073a0ee172f3daa62325af021a68f707511a0f00000000000000e178173342922ad27a3fd664f239e00dd90a68d3daea076c3fd5a6e36be4b105bd30442d2b0c13533022319c512df38443dda3eab9dff6e16e0103b81bf5c50a')
      );

      expect(
        polkadot.staking.getBalance(keyring.one.publicKey).toNumber()
      ).toEqual(32);
      expect(
        polkadot.staking.getBalance(keyring.two.publicKey).toNumber()
      ).toEqual(79);
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
