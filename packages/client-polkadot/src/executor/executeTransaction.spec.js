// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const createHeader = require('@polkadot/primitives-builder/header');
const stakingTransfer = require('@polkadot/primitives-builder/transaction/stakingTransfer');
const uncheckedSign = require('@polkadot/primitives-builder/unchecked/uncheckedSign');
const timestampSet = require('@polkadot/primitives-builder/unchecked/timestampSet');
const encodeHeader = require('@polkadot/primitives-codec/header/encode');
const encodeUtx = require('@polkadot/primitives-codec/unchecked/encode');
const chain = require('@polkadot/client-chains/chains/nelson');
const memoryDb = require('@polkadot/client-db/memory');
const createRuntime = require('@polkadot/client-runtime');
const keyring = require('@polkadot/util-keyring/testing')();
const l = require('@polkadot/util/logger')('test');

const createDb = require('../dbState');
const createExecutor = require('./index');

describe('executeTransaction', () => {
  let executor;
  let stateDb;

  function getNextHeader (header) {
    return executor.executeTransaction(
      header,
      encodeUtx(
        timestampSet(100000)
      )
    );
  }

  beforeEach(() => {
    const config = {
      wasm: {}
    };
    const runtime = createRuntime(chain, memoryDb());

    stateDb = createDb(runtime.environment.db);
    executor = createExecutor({ config, runtime, chain, stateDb, l });
  });

  beforeEach(() => {
    stateDb.staking.setBalance(keyring.one.publicKey, 69 + 42);
  });

  it('executes a basic transaction', () => {
    executor.executeTransaction(
      getNextHeader(
        encodeHeader(
          createHeader({
            number: 1,
            transactionRoot: new Uint8Array([])
          })
        )
      ),
      encodeUtx(
        uncheckedSign(keyring.one, stakingTransfer(
          keyring.one.publicKey, keyring.two.publicKey, 69, 0
        ))
      )
    );

    expect(
      stateDb.staking.getBalance(keyring.one.publicKey).toNumber()
    ).toEqual(42);
    expect(
      stateDb.staking.getBalance(keyring.two.publicKey).toNumber()
    ).toEqual(69);
  });
});
