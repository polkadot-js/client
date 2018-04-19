// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const BN = require('bn.js');
const memDb = require('@polkadot/client-db/memory');
const createDb = require('@polkadot/client-db-chain/state');
// const code = require('@polkadot/client-chains/wasm/genesis_polkadot_wasm');
const hexToU8a = require('@polkadot/util/hex/toU8a');
const keyring = require('@polkadot/util-keyring/testingPairs')();

const genesis = require('./index');

describe.skip('genesis', () => {
  let block;

  beforeEach(() => {
    const authorities = [keyring.one.publicKey, keyring.two.publicKey];
    const chain = {
      authorities,
      validators: authorities,
      balances: authorities.map((accountId) => ({
        accountId,
        balance: new BN(1000)
      })),
      code: null,
      params: {
        approvalRatio: new BN(667),
        blockTime: new BN(5),
        bondingDuration: new BN(90),
        sessionLength: new BN(720),
        sessionsPerEra: new BN(24)
      }
    };
    const stateDb = createDb(memDb());

    block = genesis({ chain, stateDb });
  });

  it('creates a correct genesis block (stateRoot)', () => {
    expect(
      block.header.stateRoot
    ).toEqual(
      hexToU8a('0x15b65fc4af871cd489f0b8fdf9ad94eca56e443a1a8735c0413bd049069dcd0a')
    );
  });

  it('creates a correct genesis block (transactionRoot)', () => {
    expect(
      block.header.transactionRoot
    ).toEqual(
      hexToU8a('0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421')
    );
  });

  it('creates a correct block hash', () => {
    expect(
      block.header.hash
    ).toEqual(
      hexToU8a('0x4d264a499c1f33134d504c6f3ec50c245206e0540354b65e280084769756779a')
    );
  });
});
