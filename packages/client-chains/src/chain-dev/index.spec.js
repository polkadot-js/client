// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const memDb = require('@polkadot/client-db/memory');
const hexToU8a = require('@polkadot/util/hex/toU8a');

const init = require('../init');
const config = require('./index');

describe('genesis', () => {
  let genesis;

  beforeEach(() => {
    const stateDb = memDb();
    const blockDb = memDb();

    genesis = init(config, stateDb, blockDb).genesis;
  });

  it('creates a correct genesis block (stateRoot)', () => {
    expect(
      genesis.header.stateRoot
    ).toEqual(
      new Uint8Array([133, 218, 140, 182, 43, 145, 77, 72, 119, 152, 247, 190, 16, 37, 199, 164, 59, 142, 238, 150, 62, 132, 122, 69, 112, 213, 167, 118, 182, 71, 247, 210])
    );
  });

  it('creates a correct genesis block (extrinsicsRoot)', () => {
    expect(
      genesis.header.extrinsicsRoot
    ).toEqual(
      hexToU8a('0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421')
    );
  });

  it('creates a correct block hash', () => {
    expect(
      genesis.hash
    ).toEqual(
      new Uint8Array([84, 57, 249, 216, 185, 26, 248, 116, 15, 160, 105, 99, 44, 179, 200, 161, 64, 248, 104, 240, 111, 84, 182, 134, 130, 50, 37, 138, 242, 42, 27, 135])
    );
  });
});
