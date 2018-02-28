// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { RuntimeEnv, RuntimeInterface$Crypto, PointerType } from '../types';

const blake2AsU8a256 = require('@polkadot/util-crypto/blake2/asU8a256');
const naclVerify = require('@polkadot/util-crypto/nacl/verify');
const xxhashAsU8a = require('@polkadot/util-crypto/xxhash/asU8a');

// TODO: This _could_ be useful elsewhere, but as of now not moving it since it is used only here
function u8aDisplay (u8a: Uint8Array): string {
  let isHex = false;

  return u8a.reduce((result, ch) => {
    if (!isHex && (ch < 48 || ch > 122)) {
      isHex = true;
      result += '0x';
    }

    result += isHex
      ? `0${Number(ch).toString(16)}`.slice(-2)
      : String.fromCharCode(ch);

    return result;
  }, '');
}

module.exports = function crypto ({ l, heap }: RuntimeEnv): RuntimeInterface$Crypto {
  const twox = (bitLength: number, dataPtr: PointerType, dataLen: number, outPtr: PointerType): void => {
    const data = heap.get(dataPtr, dataLen);
    const hash = xxhashAsU8a(data, bitLength);

    l.debug(() => [`twox_${bitLength}`, [dataPtr, dataLen, outPtr], '<-', u8aDisplay(data), '->', hash.toString()]);

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
