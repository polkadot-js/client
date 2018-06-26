// Copyright 2017-2018 @polkadot/client-chains authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import memDb from '@polkadot/util-triedb/temp';

import init from '../index';

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
        232, 3, 212, 239, 20, 49, 65, 77, 86, 68, 197, 212, 177, 241, 76, 178, 26, 142, 255, 94, 53, 233, 250, 34, 213, 124, 35, 178, 189, 131, 41, 79
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
        27, 232, 237, 33, 3, 51, 112, 44, 133, 33, 8, 49, 146, 238, 217, 114, 216, 28, 16, 255, 124, 53, 209, 85, 192, 157, 181, 247, 78, 101, 19, 96
      ])
    );
  });
});
