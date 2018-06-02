// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const stakingTransfer = require('@polkadot/primitives-builder/transaction/stakingTransfer');
const uncheckedSign = require('@polkadot/primitives-builder/unchecked/uncheckedSign');
const createBlock = require('@polkadot/primitives-builder/block');
const encodeBlock = require('@polkadot/primitives-codec/block/encode');
const hexToU8a = require('@polkadot/util/hex/toU8a');
const memoryDb = require('@polkadot/client-db/memory');
const keyring = require('@polkadot/util-keyring/testingPairs')();

const init = require('@polkadot/client-chains');

describe('executeBlock', () => {
  let chain;
  let stateDb;

  beforeEach(() => {
    const config = {
      chain: 'dev',
      wasm: {}
    };

    chain = init(config, memoryDb(), memoryDb());
  });

  beforeEach(() => {
    chain.state.staking.freeBalanceOf.set(69 + 42, keyring.one.publicKey());
    chain.state.staking.freeBalanceOf.set(0, keyring.two.publicKey());
  });

  it('executes with no external extrinsics', () => {
    expect(
      chain.executor.executeBlock(
        encodeBlock(
          createBlock({
            header: {
              parentHash: chain.state.system.blockHashAt.get(0),
              number: 1,
              stateRoot: new Uint8Array([
                202, 62, 55, 51, 175, 184, 11, 195, 85, 147, 88, 241, 90, 22, 236, 240, 90, 188, 77, 134, 134, 70, 57, 104, 69, 94, 216, 123, 99, 229, 230, 24
              ])
            },
            timestamp: 100000,
            transactions: []
          })
        )
      )
    ).toBe(true);
  });

  it('executes a basic block', () => {
    // block1
    chain.executor.executeBlock(
      encodeBlock(
        createBlock({
          header: {
            parentHash: chain.state.system.blockHashAt.get(0),
            number: 1,
            stateRoot: hexToU8a('0x3df569d47a0d7f4a448486f04fba4eea3e9dfca001319c609f88b3a67b0dd1ea')
          },
          timestamp: 100000,
          transactions: [
            uncheckedSign(keyring.one, stakingTransfer(
              keyring.one.publicKey(), keyring.two.publicKey(), 69, 0
            ))
          ]
        })
      )
    );

    expect(
      stateDb.staking.freeBalanceOf.get(keyring.one.publicKey()).toNumber()
    ).toEqual(42);
    expect(
      stateDb.staking.freeBalanceOf.get(keyring.two.publicKey()).toNumber()
    ).toEqual(69);

    chain.executor.executeBlock(
      encodeBlock(
        createBlock({
          header: {
            parentHash: stateDb.system.blockHashAt.get(1),
            number: 2,
            stateRoot: hexToU8a('0x6b1df261bab7dc96a7428bff9fa740f26cc08cd1214834e52e3bdd4fed5557a5')
          },
          timestamp: 200000,
          transactions: [
            uncheckedSign(keyring.two, stakingTransfer(
              keyring.two.publicKey(), keyring.one.publicKey(), 5, 0
            )),
            uncheckedSign(keyring.one, stakingTransfer(
              keyring.one.publicKey(), keyring.two.publicKey(), 15, 1
            ))
          ]
        })
      )
    );

    expect(
      chain.state.staking.freeBalanceOf.get(keyring.one.publicKey()).toNumber()
    ).toEqual(32);
    expect(
      chain.state.staking.freeBalanceOf.get(keyring.two.publicKey()).toNumber()
    ).toEqual(79);
  });
});
