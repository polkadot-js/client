// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const extrinsics = require('@polkadot/extrinsics');
const encodeSigned = require('@polkadot/extrinsics-codec/encode/sign');
const createBlock = require('@polkadot/primitives-builder/block');
const encodeBlock = require('@polkadot/primitives-codec/block/encode');
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
    chain.state.staking.freeBalanceOf.set(0, keyring.two.publicKey());

    transactions = [
      encodeSigned(keyring.nobody, 0)(
        extrinsics.timestamp.public.set,
        [12345]
      ),
      encodeSigned(keyring.nobody, 0)(
        extrinsics.parachains.public.setHeads,
        [[]]
      ),
      encodeSigned(keyring.one, 0)(
        extrinsics.staking.public.transfer,
        [keyring.two.publicKey(), 69]
      )
    ];
  });

  it('executes the created block', () => {
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

    expect(
      chain.state.staking.freeBalanceOf
        .get(keyring.two.publicKey())
        .toNumber()
    ).toEqual(69);
  });
});
