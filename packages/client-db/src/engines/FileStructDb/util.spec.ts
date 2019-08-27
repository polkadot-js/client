// Copyright 2017-2019 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { readU32, writeU32 } from './util';

describe('util', (): void => {
  // it('compresses when serializing', () => {
  //   // alexander block 1
  //   const u8a = hexToU8a('0x9aa25e4c67a8a7e1d77572e4c3b97ca8110df952cfc3d345cec5e88cb1e3a96f01dcd1346701ca8396496e52aa2785b1748deb6db09551b72159dcb3e08991025b0489d0e979afb54e4ba041e942c252fefd83b94b4c8e71821bdf663347fe169eaaf6ae75ee1f0895eebee8bc19f5b68fea145ffee1102d00c83950e5a70f907490040330295a0f000000007ea5fce566f9fd4ec6eb49208b420d654a219e4fc3d56caff6ba8c3a7df6fbba950c4b867a8177adac98dc4e37c8c631ceb63fdbe4a8e51fbc1968413277b00c0108200100000320f71c5c10010b0000000000');
  //   const cmp = serializeValue(u8a, true);

  //   console.log('original vs serialized', u8a.length, cmp.length);

  //   expect(u8a.length !== cmp.length).toBe(true);
  // });

  it('reads and writes u8a uint32', (): void => {
    const u8a = new Uint8Array(6);

    writeU32(u8a, 0x12345678, 1);

    expect(readU32(u8a, 1)).toEqual(0x12345678);
  });
});
