// Copyright 2017-2019 @polkadot/client-chains authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { u8aToHex } from '@polkadot/util';

import Chain from '../index';

describe('genesis', () => {
  const genesis = new Chain({ chain: 'dev', db: { type: 'memory' } } as any).genesis;

  it('creates a correct genesis block (parentHash)', () => {
    expect(
      genesis.block.header.parentHash.toHex()
    ).toEqual(
      '0x0000000000000000000000000000000000000000000000000000000000000000'
    );
  });

  it('creates a correct genesis block (stateRoot)', () => {
    expect(
      genesis.block.header.stateRoot.toHex()
    ).toEqual(
      '0xf51fa1968b1f74ae72b91c8e4a73658633b6f663a30d7f4f1c2e4436c717d4e8'
    );
  });

  it('creates a correct genesis block (extrinsicsRoot)', () => {
    expect(
      genesis.block.header.extrinsicsRoot.toHex()
    ).toEqual(
      '0x03170a2e7597b7b7e3d84c05391d139a62b157e78786d8c082f29dcf4c111314'
    );
  });

  it('creates a correct block hash', () => {
    expect(
      u8aToHex(genesis.block.hash)
    ).toEqual(
      '0x3e66d3b17a316ecf9bf3fc35e4131500d1dbb41de3ee210f7a680a2c5327b490'
    );
  });
});
