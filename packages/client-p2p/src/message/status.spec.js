// ISC, Copyright 2017 Jaco Greeff

const BN = require('bn.js');

const StatusMessage = require('./status');

describe('StatusMessage', () => {
  it('assigns sane defaults', () => {
    expect(
      new StatusMessage()
    ).toMatchObject({
      roles: ['none'],
      bestNumber: new BN(0),
      bestHash: '0x00',
      genesisHash: '0x00',
      validatorSignature: '0x00',
      validatorId: '0x00',
      parachainId: new BN(0)
    });
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
        bestHash: '0x2',
        genesisHash: '0x3',
        validatorSignature: '0x4',
        validatorId: '0x5'
        // parachainId: new BN(6)
      })._rawEncode()
    );

    expect(
      result
    ).toMatchObject({
      roles: ['full', 'validator'],
      // bestNumber: new BN(1),
      bestHash: '0x02',
      genesisHash: '0x03',
      validatorSignature: '0x04',
      validatorId: '0x05'
      // parachainId: new BN(6)
    });
  });
});
