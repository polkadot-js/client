// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const BN = require('bn.js');
const hexToU8a = require('@polkadot/util/hex/toU8a');

const Best = require('./best');

describe('Best', () => {
  it('assigns sane defaults', () => {
    expect(
      new Best()
    ).toEqual({
      hash: hexToU8a('0x00', 256),
      number: new BN(0)
    });
  });

  it('assigns supplied values', () => {
    expect(
      new Best(hexToU8a('0x1234'), new BN(0x1234))
    ).toEqual({
      hash: hexToU8a('0x1234'),
      number: new BN(0x1234)
    });
  });
});
