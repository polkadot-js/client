// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
/* eslint camelcase: 0 */

const index = require('../index');

describe('ed25519Verify', () => {
  let heap;
  let ed25519_verify;

  beforeEach(() => {
    const uint8 = new Uint8Array([
      0x61, 0x62, 0x63, 0x64,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      // publicKey, offset 4 + 6 = 10
      180, 114, 93, 155, 165, 255, 217, 82, 16, 250, 209, 11, 193, 10, 88, 218, 190, 190, 41, 193, 236, 252, 1, 152, 216, 214, 0, 41, 45, 138, 13, 53,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      // signature, offset 32 + 8 = 50
      209, 234, 164, 44, 182, 218, 103, 16, 205, 238, 97, 222, 123, 112, 2, 240, 24, 192, 26, 134, 11, 170, 167, 153, 141, 108, 187, 171, 241, 125, 226, 179, 244, 232, 131, 61, 44, 68, 87, 41, 141, 131, 88, 36, 175, 173, 57, 29, 12, 112, 26, 200, 247, 89, 14, 64, 224, 188, 211, 198, 233, 119, 158, 6
    ]);

    heap = {
      get: (ptr, len) => uint8.subarray(ptr, ptr + len)
    };

    ed25519_verify = index({ heap }).ed25519_verify;
  });

  it('verifies correct signatures', () => {
    expect(
      ed25519_verify(
        0, 4,
        50,
        10
      )
    ).toEqual(0);
  });

  it('fails correct signatures', () => {
    expect(
      ed25519_verify(
        0, 3,
        50,
        10
      )
    ).not.toEqual(0);
  });
});
