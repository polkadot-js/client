// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const BN = require('bn.js');
const hexToU8a = require('@polkadot/util/hex/toU8a');

const StatusMessage = require('./status');

describe('StatusMessage', () => {
  it('assigns sane defaults', () => {
    expect(
      JSON.stringify(
        new StatusMessage()
      )
    ).toEqual(
      JSON.stringify({
        id: 0,
        version: 0,
        roles: ['none'],
        bestNumber: new BN(0),
        bestHash: hexToU8a('0x0', 256),
        genesisHash: hexToU8a('0x0', 256),
        validatorSignature: hexToU8a('0x0', 512),
        validatorId: hexToU8a('0x0', 160),
        parachainId: new BN(0)
      })
    );
  });

  it('assigns constructor values', () => {
    expect(
      new StatusMessage({
        roles: ['full', 'validator'],
        bestNumber: new BN(1),
        bestHash: '0x2',
        genesisHash: '0x3',
        validatorSignature: '0x4',
        validatorId: '0x5',
        parachainId: new BN(6)
      })
    ).toMatchObject({
      roles: ['full', 'validator'],
      bestNumber: new BN(1),
      bestHash: '0x2',
      genesisHash: '0x3',
      validatorSignature: '0x4',
      validatorId: '0x5',
      parachainId: new BN(6)
    });
  });

  it('encodes and decodes via rawDecode/Encode', () => {
    const result = new StatusMessage();

    result._rawDecode(
      new StatusMessage({
        roles: ['full', 'validator'],
        // bestNumber: new BN(1),
        bestHash: hexToU8a('0x2', 256),
        genesisHash: hexToU8a('0x3', 256),
        validatorSignature: hexToU8a('0x4', 512),
        validatorId: hexToU8a('0x5', 160)
        // parachainId: new BN(6)
      })._rawEncode()
    );

    expect(
      result
    ).toMatchObject({
      roles: ['full', 'validator'],
      // bestNumber: new BN(1),
      bestHash: hexToU8a('0x2', 256),
      genesisHash: hexToU8a('0x3', 256),
      validatorSignature: hexToU8a('0x4', 512),
      validatorId: hexToU8a('0x5', 160)
      // parachainId: new BN(6)
    });
  });
});
