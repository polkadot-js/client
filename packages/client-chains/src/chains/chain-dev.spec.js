// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const memDb = require('@polkadot/util-triedb/temp');

const init = require('../index');

describe('genesis', () => {
  let genesis;

  beforeEach(() => {
    const stateDb = memDb();
    const blockDb = memDb();

    genesis = init({ chain: 'dev' }, stateDb, blockDb).genesis;
  });

  it('creates a correct genesis block (stateRoot)', () => {
    expect(
      genesis.header.stateRoot
    ).toEqual(
      new Uint8Array([
        183, 79, 108, 134, 124, 245, 189, 86, 29, 84, 33, 80, 31, 234, 186, 201, 226, 21, 241, 214, 43, 76, 90, 92, 146, 31, 182, 6, 147, 161, 56, 103
      ])
    );
  });

  it('creates a correct genesis block (extrinsicsRoot)', () => {
    expect(
      genesis.header.extrinsicsRoot
    ).toEqual(
      new Uint8Array([
        86, 232, 31, 23, 27, 204, 85, 166, 255, 131, 69, 230, 146, 192, 248, 110, 91, 72, 224, 27, 153, 108, 173, 192, 1, 98, 47, 181, 227, 99, 180, 33
      ])
    );
  });

  it('creates a correct block hash', () => {
    expect(
      genesis.headerHash
    ).toEqual(
      new Uint8Array([
        168, 135, 224, 93, 140, 222, 226, 83, 13, 116, 138, 197, 164, 6, 48, 190, 101, 18, 221, 166, 40, 179, 158, 112, 133, 154, 215, 198, 177, 76, 212, 228
      ])
    );
  });
});
