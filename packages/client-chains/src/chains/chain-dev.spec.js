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
        162, 246, 235, 43, 229, 240, 111, 81, 162, 19, 77, 175, 100, 72, 70, 199, 187, 47, 85, 230, 222, 236, 167, 247, 107, 162, 194, 140, 2, 175, 72, 159
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
        146, 38, 162, 251, 223, 62, 233, 6, 37, 13, 91, 144, 4, 83, 185, 88, 136, 237, 195, 199, 164, 34, 13, 227, 172, 12, 186, 13, 208, 21, 160, 233
      ])
    );
  });
});
