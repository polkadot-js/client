// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const stakingTransfer = require('@polkadot/primitives-builder/transaction/stakingTransfer');
const uncheckedSign = require('@polkadot/primitives-builder/unchecked/uncheckedSign');
const createBlock = require('@polkadot/primitives-builder/block');
const encodeBlock = require('@polkadot/primitives-codec/block/encode');
const hexToU8a = require('@polkadot/util/hex/toU8a');
const chain = require('@polkadot/client-chains/chains/nelson');
const code = require('@polkadot/client-chains/wasm/polkadot_runtime_wasm');
const memoryDb = require('@polkadot/client-db/memory');
const keyring = require('@polkadot/util-keyring/testing')();

const createDb = require('./db');
const wasm = require('./wasm');

describe('wasm', () => {
  let instance;
  let db;

  beforeEach(() => {
    const config = {
      wasm: {}
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

  // FIXME: Skipped since we need to execute timestamp on block and then execute the actual transaction on the next header
  // describe('execute_transaction', () => {
  //   it('executes a basic transaction', () => {
  //     instance.execute_transaction(
  //       u8aConcat([
  //         encodeHeader(
  //           createHeader({
  //             number: 1,
  //             transactionRoot: new Uint8Array([])
  //           })
  //         ),
  //         encodeUnchecked(
  //           uncheckedSign(keyring.one, stakingTransfer(
  //             keyring.one.publicKey, keyring.two.publicKey, 69, 0
  //           ))
  //         )
  //       ])
  //     );
  //
  //     expect(
  //       db.staking.getBalance(keyring.one.publicKey).toNumber()
  //     ).toEqual(42);
  //     expect(
  //       db.staking.getBalance(keyring.two.publicKey).toNumber()
  //     ).toEqual(69);
  //   });
  // });

  describe('execute_block', () => {
    beforeEach(() => {
      const threePublicKey = hexToU8a('0x0303030303030303030303030303030303030303030303030303030303030303');

      db.governance.setApprovalsRatio(667);
      db.session.setLength(2);
      db.session.setValueCount(3);
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
              stateRoot: hexToU8a('0x3df569d47a0d7f4a448486f04fba4eea3e9dfca001319c609f88b3a67b0dd1ea')
            },
            timestamp: 100000,
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

      instance.execute_block(
        encodeBlock(
          createBlock({
            header: {
              parentHash: db.system.getBlockHash(1),
              number: 2,
              stateRoot: hexToU8a('0x6b1df261bab7dc96a7428bff9fa740f26cc08cd1214834e52e3bdd4fed5557a5')
            },
            timestamp: 200000,
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
