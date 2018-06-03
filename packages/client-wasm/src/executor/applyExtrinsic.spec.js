// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const extrinsics = require('@polkadot/extrinsics');
const memoryDb = require('@polkadot/client-db/memory');
const encodeSigned = require('@polkadot/extrinsics-codec/encode/sign');
const createHeader = require('@polkadot/primitives-builder/header');
const encodeHeader = require('@polkadot/primitives-codec/header/encode');
const keyring = require('@polkadot/util-keyring/testingPairs')();

const init = require('@polkadot/client-chains');

describe('applyExtrinsic', () => {
  let chain;

  beforeEach(() => {
    const config = {
      chain: 'dev',
      wasm: {}
    };

    chain = init(config, memoryDb(), memoryDb());

    chain.state.staking.freeBalanceOf.set(69 + 42, keyring.one.publicKey());
    chain.state.staking.freeBalanceOf.set(0, keyring.two.publicKey());

    chain.executor.initialiseBlock(
      encodeHeader(
        createHeader({
          number: 1,
          parentHash: chain.genesis.headerHash,
          extrinsicsRoot: new Uint8Array(32)
        })
      )
    );

    chain.executor.applyExtrinsic(
      encodeSigned(keyring.nobody, 0)(
        extrinsics.timestamp.public.set,
        [12345]
      )
    );

    // chain.executor.applyExtrinsic(
    //   encodeSigned(keyring.nobody, 0)(
    //     extrinsics.parachains.public.setHeads,
    //     [[]]
    //   )
    // );
  });

  it('executes a basic transaction', () => {
    chain.executor.applyExtrinsic(
      encodeSigned(keyring.one, 0)(
        extrinsics.staking.public.transfer,
        [keyring.two.publicKey(), 69]
      )
    );

    // 2f8c6129d816cf51c374bc7f08c3e63ed156cf78aefb4a6550d97b87997977ee
    // 00000000
    // 0200
    // d75a980182b10ab7d54bfed3c964073a0ee172f3daa62325af021a68f707511a
    // 45000000000000000000000000000000
    // 8238ab36aa1eb6ef5d3c24c9bc13f45969b431520dfb0575bf086a3e18aa8864
    // 818343dfec9273934136f04fb22fa31c37d044b46e4644be07d87ff03bbdfd09

    expect(
      chain.state.staking.freeBalanceOf.get(keyring.one.publicKey()).toNumber()
    ).toEqual(42 - 1); // transaction fee of 1
    expect(
      chain.state.staking.freeBalanceOf.get(keyring.two.publicKey()).toNumber()
    ).toEqual(69);
  });
});
