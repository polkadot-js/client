// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { RuntimeEnv, RuntimeInterface$Crypto, PointerType } from '../types';

const blake256 = require('./blake256');
const ed25519Verify = require('./ed25519/verify');
const twox128 = require('./twox128');
const twox256 = require('./twox256');

module.exports = function crypto ({ heap }: RuntimeEnv): RuntimeInterface$Crypto {
  return {
    blake2_256: (data: PointerType, len: number, out: PointerType): void =>
      heap.set(out, blake256(heap.get(data, len))),
    twox_128: (data: PointerType, len: number, out: PointerType): void =>
      heap.set(out, twox128(heap.get(data, len))),
    twox_256: (data: PointerType, len: number, out: PointerType): void =>
      heap.set(out, twox256(heap.get(data, len))),
    ed25519_verify: (msgPtr: PointerType, msgLen: number, sigPtr: PointerType, pubkeyPtr: PointerType): number =>
      ed25519Verify(
        heap.get(msgPtr, msgLen),
        heap.get(sigPtr, 64),
        heap.get(pubkeyPtr, 32)
      )
  };
};
