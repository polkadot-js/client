// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const createHeader = require('@polkadot/primitives-builder/blockHeader');
const stakingTransfer = require('@polkadot/primitives-builder/transaction/stakingTransfer');
const uncheckedSign = require('@polkadot/primitives-builder/unchecked/uncheckedSign');
const timestampSet = require('@polkadot/primitives-builder/unchecked/timestampSet');
const chain = require('@polkadot/client-chains/chains/nelson');
const code = require('@polkadot/client-chains/wasm/polkadot_runtime_wasm');
const memoryDb = require('@polkadot/client-db/memory');
const createRuntime = require('@polkadot/client-runtime');
const keyring = require('@polkadot/util-keyring/testing')();

const createDb = require('../db');
const createExecutor = require('./index');

describe('executeTransaction', () => {
  let executor;
  let db;

  function getNextHeader (header) {
    return executor.executeTransaction(
      header,
      timestampSet(100000)
    );
  }

  beforeEach(() => {
    const config = {
      wasm: {}
    };
    const runtime = createRuntime(chain, memoryDb());

    executor = createExecutor(config, runtime, code);
    db = createDb(runtime.environment.db);
  });

  beforeEach(() => {
    db.staking.setBalance(keyring.one.publicKey, 69 + 42);
  });

  it('executes a basic transaction', () => {
    executor.executeTransaction(
      getNextHeader(
        createHeader({
          number: 1,
          transactionRoot: new Uint8Array([])
        })
      ),
      uncheckedSign(keyring.one, stakingTransfer(
        keyring.one.publicKey, keyring.two.publicKey, 69, 0
      ))
    );

    expect(
      db.staking.getBalance(keyring.one.publicKey).toNumber()
    ).toEqual(42);
    expect(
      db.staking.getBalance(keyring.two.publicKey).toNumber()
    ).toEqual(69);
  });
});
