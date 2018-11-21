// Copyright 2017-2018 @polkadot/client-chains authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { u8aToU8a as toU8a } from '@polkadot/util';

import Chain from '../index';

describe('genesis', () => {
  const genesis = new Chain({ chain: 'dev', db: { type: 'memory' } }).genesis;

  it('creates a correct genesis block (stateRoot)', () => {
    expect(
      genesis.header.stateRoot
    ).toEqual(
      new Uint8Array([
        26, 15, 61, 97, 9, 45, 214, 61, 55, 236, 182, 191, 36, 240, 249, 10, 101, 191, 177, 19, 188, 150, 237, 117, 31, 5, 120, 214, 142, 255, 69, 130
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
        13, 85, 34, 171, 245, 12, 16, 73, 197, 106, 231, 219, 139, 87, 173, 252, 126, 2, 55, 165, 8, 237, 221, 136, 95, 19, 249, 60, 247, 193, 8, 201
      ])
    );
  });
});
