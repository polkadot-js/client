// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const createHeader = require('@polkadot/primitives-builder/header');
const stakingTransfer = require('@polkadot/primitives-builder/transaction/stakingTransfer');
const uncheckedSign = require('@polkadot/primitives-builder/unchecked/uncheckedSign');
const timestampSet = require('@polkadot/primitives-builder/unchecked/timestampSet');
const encodeHeader = require('@polkadot/primitives-codec/header/encode');
const encodeUtx = require('@polkadot/primitives-codec/unchecked/encode');
const memoryDb = require('@polkadot/client-db/memory');
const keyring = require('@polkadot/util-keyring/testingPairs')();

const init = require('../index');

describe('applyExtrinsic', () => {
  let chain;

  function getNextHeader (header) {
    return chain.executor.applyExtrinsic(
      header,
      encodeUtx(
        timestampSet(100000)
      )
    );
  }

  beforeEach(() => {
    const config = {
      chain: 'dev',
      wasm: {}
    };

    chain.executor = init(config, memoryDb(), memoryDb());
  });

  beforeEach(() => {
    chain.state.staking.freeBalanceOf.set(69 + 42, keyring.one.publicKey());
    chain.state.staking.freeBalanceOf.set(0, keyring.two.publicKey());
  });

  it('executes a basic transaction', () => {
    chain.executor.applyExtrinsic(
      getNextHeader(
        encodeHeader(
          createHeader({
            number: 1,
            extrinsicsRoot: new Uint8Array([])
          })
        )
      ),
      encodeUtx(
        uncheckedSign(keyring.one, stakingTransfer(
          keyring.one.publicKey(), keyring.two.publicKey(), 69, 0
        ))
      )
    );

    expect(
      chain.state.staking.freeBalanceOf.get(keyring.one.publicKey()).toNumber()
    ).toEqual(42);
    expect(
      chain.state.staking.freeBalanceOf.get(keyring.two.publicKey()).toNumber()
    ).toEqual(69);
  });
});
