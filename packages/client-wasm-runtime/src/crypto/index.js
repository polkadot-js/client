// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { RuntimeEnv, RuntimeInterface$Crypto, PointerType } from '../types';

const blake2AsU8a256 = require('@polkadot/util-crypto/blake2/asU8a256');
const naclVerify = require('@polkadot/util-crypto/nacl/verify');
const xxhashAsU8a128 = require('@polkadot/util-crypto/xxhash/asU8a128');
const xxhashAsU8a256 = require('@polkadot/util-crypto/xxhash/asU8a256');

module.exports = function crypto ({ heap }: RuntimeEnv): RuntimeInterface$Crypto {
  return {
    blake2_256: (data: PointerType, len: number, out: PointerType): void =>
      heap.set(out, blake2AsU8a256(heap.get(data, len))),
    ed25519_verify: (msgPtr: PointerType, msgLen: number, sigPtr: PointerType, pubkeyPtr: PointerType): number =>
      naclVerify(
        heap.get(msgPtr, msgLen),
        heap.get(sigPtr, 64),
        heap.get(pubkeyPtr, 32)
      ) ? 0 : 5,
    twox_128: (data: PointerType, len: number, out: PointerType): void =>
      heap.set(out, xxhashAsU8a128(heap.get(data, len))),
    twox_256: (data: PointerType, len: number, out: PointerType): void =>
      heap.set(out, xxhashAsU8a256(heap.get(data, len)))
  };
};
