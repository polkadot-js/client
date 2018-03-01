// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const stakingTransfer = require('@polkadot/primitives-builder/transaction/stakingTransfer');
const uncheckedSign = require('@polkadot/primitives-builder/unchecked/uncheckedSign');
const encodeUtx = require('@polkadot/primitives-codec/unchecked/encode');
const hexToU8a = require('@polkadot/util/hex/toU8a');
const chain = require('@polkadot/client-chains/chains/nelson');
const code = require('@polkadot/client-chains/wasm/polkadot_runtime_wasm');
const memoryDb = require('@polkadot/client-db/memory');
const createRuntime = require('@polkadot/client-runtime');
const keyring = require('@polkadot/util-keyring/testing')();

const createDb = require('../db');
const createExecutor = require('./index');

const TIMESTAMP = '71000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00000000000000000020a107000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000';
const TRANSFER = '910000002f8c6129d816cf51c374bc7f08c3e63ed156cf78aefb4a6550d97b87997977ee000000000000000022d75a980182b10ab7d54bfed3c964073a0ee172f3daa62325af021a68f707511a45000000000000005f9832c5a4a39e2dd4a3a0c5b400e9836beb362cb8f7d845a8291a2ae6fe366612e080e4acd0b5a75c3d0b6ee69614a68fb63698c1e76bf1f2dcd8fa617ddf05';

describe('generateBlock', () => {
  let executor;
  let db;

  beforeEach(() => {
    const config = {
      wasm: {}
    };
    const runtime = createRuntime(chain, memoryDb());

    executor = createExecutor(config, runtime, code);
    db = createDb(runtime.environment.db);

    const threePublicKey = hexToU8a('0x0303030303030303030303030303030303030303030303030303030303030303');

    db.governance.setApprovalsRatio(667);
    db.session.setLength(2);
    db.session.setValueCount(3);
    db.session.setValue(0, keyring.one.publicKey);
    db.session.setValue(1, keyring.two.publicKey);
    db.session.setValue(2, threePublicKey);
    db.staking.setBalance(keyring.one.publicKey, 69 + 42);
    db.staking.setCurrentEra(0);
    db.staking.setIntentLength(3);
    db.staking.setIntent(0, keyring.one.publicKey);
    db.staking.setIntent(1, keyring.two.publicKey);
    db.staking.setIntent(2, threePublicKey);
    db.staking.setSessionsPerEra(2);
    db.staking.setValidatorCount(3);
    db.system.setBlockHash(0, hexToU8a('0x4545454545454545454545454545454545454545454545454545454545454545'));

    runtime.environment.db.commit();
  });

  it('generates a basic block', () => {
    expect(
      executor.generateBlock(1, [
        uncheckedSign(keyring.one, stakingTransfer(
          keyring.one.publicKey, keyring.two.publicKey, 69, 0
        ))
      ].map(encodeUtx), 500000)
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
      uncheckedSign(keyring.one, stakingTransfer(
        keyring.one.publicKey, keyring.two.publicKey, 69, 0
      ))
    ].map(encodeUtx));

    expect(
      executor.importBlock(block)
    ).toEqual(true);
  });

  it('blocks are importable on top of previous', () => {
    executor.importBlock(
      executor.generateBlock(1, [
        uncheckedSign(keyring.one, stakingTransfer(
          keyring.one.publicKey, keyring.two.publicKey, 69, 0
        ))
      ].map(encodeUtx))
    );

    const block = executor.generateBlock(2, [
      uncheckedSign(keyring.two, stakingTransfer(
        keyring.two.publicKey, keyring.one.publicKey, 5, 0
      ))
    ].map(encodeUtx));

    expect(
      executor.importBlock(block)
    ).toEqual(true);
  });
});
