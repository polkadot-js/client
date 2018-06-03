// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const extrinsics = require('@polkadot/extrinsics');
const encodeSigned = require('@polkadot/extrinsics-codec/encode/sign');
const createBlock = require('@polkadot/primitives-builder/block');
const encodeBlock = require('@polkadot/primitives-codec/block/encode');
const hexToU8a = require('@polkadot/util/hex/toU8a');
const memoryDb = require('@polkadot/client-db/memory');
const keyring = require('@polkadot/util-keyring/testingPairs')();

const init = require('@polkadot/client-chains');

describe('executeBlock', () => {
  let chain;
  let transactions;

  beforeEach(() => {
    const config = {
      chain: 'dev',
      wasm: {}
    };

    chain = init(config, memoryDb(), memoryDb());

    chain.state.staking.freeBalanceOf.set(69 + 42, keyring.one.publicKey());
    chain.state.staking.freeBalanceOf.set(10, keyring.two.publicKey());

    transactions = [
      // encodeSigned(keyring.nobody, 0)(
      //   extrinsics.timestamp.public.set,
      //   [12345]
      // ),
      // encodeSigned(keyring.nobody, 0)(
      //   extrinsics.parachains.public.setHeads,
      //   [[]]
      // )
    ];
  });

  it('executes with no external extrinsics', () => {
    expect(
      chain.executor.executeBlock(
        encodeBlock(
          createBlock({
            header: {
              number: 1,
              parentHash: chain.genesis.headerHash,
              stateRoot: new Uint8Array(32)
            },
            extrinsics: transactions
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
          extrinsics: transactions.concat([
            encodeSigned(keyring.one, 0)(
              extrinsics.staking.public.transfer,
              [keyring.two.publicKey(), 69]
            )
          ])
        })
      )
    );

    expect(
      chain.state.staking.freeBalanceOf.get(keyring.one.publicKey()).toNumber()
    ).toEqual(42 - 1); // transaction fee
    expect(
      chain.state.staking.freeBalanceOf.get(keyring.two.publicKey()).toNumber()
    ).toEqual(10 + 69);
  });

  it('executes a block with multiple externals', () => {
    chain.executor.executeBlock(
      encodeBlock(
        createBlock({
          header: {
            parentHash: chain.state.system.blockHashAt.get(0),
            number: 1,
            stateRoot: hexToU8a('0x6b1df261bab7dc96a7428bff9fa740f26cc08cd1214834e52e3bdd4fed5557a5')
          },
          extrinsics: transactions.concat([
            encodeSigned(keyring.two, 0)(
              extrinsics.staking.public.transfer,
              [keyring.one.publicKey(), 5]
            ),
            encodeSigned(keyring.one, 0)(
              extrinsics.staking.public.transfer,
              [keyring.two.publicKey(), 15]
            )
          ])
        })
      )
    );

    expect(
      chain.state.staking.freeBalanceOf.get(keyring.one.publicKey()).toNumber()
    ).toEqual(69 - 15 - 1 + 5);
    expect(
      chain.state.staking.freeBalanceOf.get(keyring.two.publicKey()).toNumber()
    ).toEqual(10 - 5 - 1 + 15);
  });
});
