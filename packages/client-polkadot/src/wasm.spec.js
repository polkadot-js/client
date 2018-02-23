// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const stakingTransfer = require('@polkadot/primitives-builder/transaction/stakingTransfer');
const uncheckedSign = require('@polkadot/primitives-builder/unchecked/uncheckedSign');
const createBlock = require('@polkadot/primitives-builder/block/block');
const createHeader = require('@polkadot/primitives-builder/block/header');
const encodeBlock = require('@polkadot/primitives-codec/block/encode');
const encodeHeader = require('@polkadot/primitives-codec/blockHeader/encode');
const encodeUnchecked = require('@polkadot/primitives-codec/unchecked/encode');
const hexToU8a = require('@polkadot/util/hex/toU8a');
const u8aConcat = require('@polkadot/util/u8a/concat');
const memoryDb = require('@polkadot/client-db/memory');
const keyring = require('@polkadot/util-keyring/testing')();

const createDb = require('./db');
const wasm = require('./wasm');
const code = require('../test/wasm/polkadot_runtime_wasm');

describe('wasm', () => {
  let instance;
  let db;

  beforeEach(() => {
    const config = {
      wasm: {}
    };
    const chain = {
      params: {
        networkId: 42
      }
    };
    const memdb = memoryDb();
    const executor = wasm(config, chain, memdb, code);

    instance = executor.instance;
    db = createDb(executor.runtime.environment.db);
  });

  beforeEach(() => {
    db.staking.setBalance(keyring.one.publicKey, 69 + 42);
  });

  it('loads the actual runtime', () => {
    expect(
      instance.execute_block
    ).toBeDefined();
  });

  describe('execute_transaction', () => {
    it('executes a basic transaction', () => {
      instance.execute_transaction(
        u8aConcat([
          encodeHeader(
            createHeader({
              number: 1,
              transactionRoot: new Uint8Array([])
            })
          ),
          encodeUnchecked(
            uncheckedSign(keyring.one, stakingTransfer(
              keyring.one.publicKey, keyring.two.publicKey, 69, 0
            ))
          )
        ])
      );

      expect(
        db.staking.getBalance(keyring.one.publicKey).toNumber()
      ).toEqual(42);
      expect(
        db.staking.getBalance(keyring.two.publicKey).toNumber()
      ).toEqual(69);
    });
  });

  describe('execute_block', () => {
    beforeEach(() => {
      const threePublicKey = hexToU8a('0x0303030303030303030303030303030303030303030303030303030303030303');

      db.governance.setApprovalsRequired(667);
      db.session.setLength(2);
      db.session.setValueLength(3);
      db.session.setValue(0, keyring.one.publicKey);
      db.session.setValue(1, keyring.two.publicKey);
      db.session.setValue(2, threePublicKey);
      db.staking.setCurrentEra(0);
      db.staking.setIntentLength(3);
      db.staking.setIntent(0, keyring.one.publicKey);
      db.staking.setIntent(1, keyring.two.publicKey);
      db.staking.setIntent(2, threePublicKey);
      db.staking.setSessionsPerEra(2);
      db.staking.setValidatorCount(3);
      db.system.setBlockHash(0, hexToU8a('0x4545454545454545454545454545454545454545454545454545454545454545'));
    });

    it('executes a basic block', () => {
      // block1
      instance.execute_block(
        encodeBlock(
          createBlock({
            header: {
              parentHash: db.system.getBlockHash(0),
              number: 1,
              stateRoot: hexToU8a('0x2481853da20b9f4322f34650fea5f240dcbfb266d02db94bfa0153c31f4a29db')
            },
            transactions: [
              uncheckedSign(keyring.one, stakingTransfer(
                keyring.one.publicKey, keyring.two.publicKey, 69, 0
              ))
            ]
          })
        )
      );

      expect(
        db.staking.getBalance(keyring.one.publicKey).toNumber()
      ).toEqual(42);
      expect(
        db.staking.getBalance(keyring.two.publicKey).toNumber()
      ).toEqual(69);
      expect(
        db.system.getBlockHash(1)
      ).toEqual(
        hexToU8a('0x1025e5db74fdaf4d2818822dccf0e1604ae9ccc62f26cecfde23448ff0248abf')
      );

      // block2
      instance.execute_block(
        encodeBlock(
          createBlock({
            header: {
              parentHash: db.system.getBlockHash(1),
              number: 2,
              stateRoot: hexToU8a('0x1feb4d3a2e587079e6ce1685fa79994efd995e33cb289d39cded67aac1bb46a9')
            },
            transactions: [
              uncheckedSign(keyring.two, stakingTransfer(
                keyring.two.publicKey, keyring.one.publicKey, 5, 0
              )),
              uncheckedSign(keyring.one, stakingTransfer(
                keyring.one.publicKey, keyring.two.publicKey, 15, 1
              ))
            ]
          })
        )
      );

      expect(
        db.staking.getBalance(keyring.one.publicKey).toNumber()
      ).toEqual(32);
      expect(
        db.staking.getBalance(keyring.two.publicKey).toNumber()
      ).toEqual(79);
    });
  });
});
