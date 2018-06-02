// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const extrinsics = require('@polkadot/extrinsics');
const encodeSigned = require('@polkadot/extrinsics-codec/encode/sign');
const hexToU8a = require('@polkadot/util/hex/toU8a');
const memoryDb = require('@polkadot/client-db/memory');
const keyring = require('@polkadot/util-keyring/testingPairs')();

const init = require('@polkadot/client-chains');

const TIMESTAMP = '71000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00000000000000000020a107000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000';
const TRANSFER = '910000002f8c6129d816cf51c374bc7f08c3e63ed156cf78aefb4a6550d97b87997977ee000000000000000022d75a980182b10ab7d54bfed3c964073a0ee172f3daa62325af021a68f707511a45000000000000005f9832c5a4a39e2dd4a3a0c5b400e9836beb362cb8f7d845a8291a2ae6fe366612e080e4acd0b5a75c3d0b6ee69614a68fb63698c1e76bf1f2dcd8fa617ddf05';

describe('generateBlock', () => {
  let executor;

  beforeEach(() => {
    const config = {
      chain: 'dev',
      wasm: {}
    };

    executor = init(config, memoryDb(), memoryDb()).executor;
  });

  it('generates a basic block (empty)', () => {
    expect(
      executor.generateBlock(1, [])
    ).toEqual(
      new Uint8array([])
    );
  });

  it('generates a basic block', () => {
    expect(
      executor.generateBlock(1, [
        encodeSigned(keyring.one, 0)(
          extrinsics.staking.public.transfer,
          [keyring.two.publicKey(), 69]
        )
      ].map(encodeUtx))
    ).toEqual(
      hexToU8a(
        '0x' +
        '4545454545454545454545454545454545454545454545454545454545454545' +
        '0100000000000000' +
        'eb59a2a2c51e70601f8bb5f99087d44d0af3297f9ed576b30ba66cd449f2720a' +
        'ba73ce9e83f1c051f815ade5309f4469686ba3ea21ef9745b5fb3fffed81e7a7' +
        '00000000' +
        // 2 txs
        '02000000' +
        TIMESTAMP +
        TRANSFER
      )
    );
  });

  it('generated blocks are importable', () => {
    const block = executor.generateBlock(1, [
      encodeSigned(keyring.one, 0)(
        extrinsics.staking.public.transfer,
        [keyring.two.publicKey(), 69]
      )
    ].map(encodeUtx));

    expect(
      executor.importBlock(block)
    ).not.toBeNull();
  });

  it('blocks are importable on top of previous', () => {
    executor.importBlock(
      executor.generateBlock(1, [
        encodeSigned(keyring.one, 0)(
          extrinsics.staking.public.transfer,
          [keyring.two.publicKey(), 69]
        )
      ].map(encodeUtx))
    );

    const block = executor.generateBlock(2, [
      encodeSigned(keyring.t2o, 0)(
        extrinsics.staking.public.transfer,
        [keyring.one.publicKey(), 5]
      )
    ].map(encodeUtx));

    expect(
      executor.importBlock(block)
    ).not.toBeNull();
  });
});
