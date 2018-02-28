// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { RuntimeEnv, RuntimeInterface$Crypto, PointerType } from '../types';

const u8aToUtf8 = require('@polkadot/util/u8a/toUtf8');
const blake2AsU8a256 = require('@polkadot/util-crypto/blake2/asU8a256');
const naclVerify = require('@polkadot/util-crypto/nacl/verify');
const xxhashAsU8a = require('@polkadot/util-crypto/xxhash/asU8a');

module.exports = function crypto ({ l, heap }: RuntimeEnv): RuntimeInterface$Crypto {
  const twox = (bitLength: number, dataPtr: PointerType, dataLen: number, outPtr: PointerType): void => {
    const data = heap.get(dataPtr, dataLen);
    const hash = xxhashAsU8a(data, bitLength);

    l.debug(() => [`twox_${bitLength}`, [dataPtr, dataLen, outPtr], '<-', u8aToUtf8(data), '->', hash.toString()]);

    heap.set(outPtr, hash);
  };

  return {
    blake2_256: (dataPtr: PointerType, dataLen: number, outPtr: PointerType): void => {
      const data = heap.get(dataPtr, dataLen);
      const hash = blake2AsU8a256(data);

      l.debug(() => ['blake2_256', [dataPtr, dataLen, outPtr], '<-', data.toString(), '->', hash.toString()]);

      heap.set(outPtr, hash);
    },
    ed25519_verify: (msgPtr: PointerType, msgLen: number, sigPtr: PointerType, pubkeyPtr: PointerType): number => {
      l.debug(() => ['ed25519_verify', [msgPtr, msgLen, sigPtr, pubkeyPtr]]);

      return naclVerify(
        heap.get(msgPtr, msgLen),
        heap.get(sigPtr, 64),
        heap.get(pubkeyPtr, 32)
      ) ? 0 : 5;
    },
    twox_128: (dataPtr: PointerType, dataLen: number, outPtr: PointerType): void =>
      twox(128, dataPtr, dataLen, outPtr),
    twox_256: (dataPtr: PointerType, dataLen: number, outPtr: PointerType): void =>
      twox(256, dataPtr, dataLen, outPtr)
  };
};
