// Copyright 2017-2018 @polkadot/client-chains authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { u8aToHex } from '@polkadot/util';

import Chain from '../index';

describe('genesis', () => {
  const genesis = new Chain({ chain: 'dev', db: { type: 'memory' } }).genesis;

  it('creates a correct genesis block (parentHash)', () => {
    expect(
      u8aToHex(genesis.header.parentHash)
    ).toEqual(
      '0x0000000000000000000000000000000000000000000000000000000000000000'
    );
  });

  it('creates a correct genesis block (stateRoot)', () => {
    expect(
      u8aToHex(genesis.header.stateRoot)
    ).toEqual(
      '0x8f10ee30db42045fc46968597094b5ff22e5051b573b77c9e4f9be7450445342'
    );
  });

  it('creates a correct genesis block (extrinsicsRoot)', () => {
    expect(
      u8aToHex(genesis.header.extrinsicsRoot)
    ).toEqual(
      '0x03170a2e7597b7b7e3d84c05391d139a62b157e78786d8c082f29dcf4c111314'
    );
  });

  it('creates a correct block hash', () => {
    expect(
      u8aToHex(genesis.headerHash)
    ).toEqual(
      '0xc29af88235602927480cc1feada648a9e658090caf1dbc87352e4b706978cf71'
    );
  });
});
