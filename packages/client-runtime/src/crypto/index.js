// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { RuntimeEnv, RuntimeInterface$Crypto, Pointer } from '../types';

const u8aToHex = require('@polkadot/util/u8a/toHex');
const blake2AsU8a = require('@polkadot/util-crypto/blake2/asU8a');
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
  const twox = (bitLength: number, dataPtr: Pointer, dataLen: number, outPtr: Pointer): void => {
    const data = heap.get(dataPtr, dataLen);
    const hash = xxhashAsU8a(data, bitLength);

    l.debug(() => [`twox_${bitLength}`, [dataPtr, dataLen, outPtr], '<-', u8aDisplay(data), '->', u8aToHex(hash)]);

    heap.set(outPtr, hash);
  };

  return {
    blake2_256: (dataPtr: Pointer, dataLen: number, outPtr: Pointer): void => {
      const data = heap.get(dataPtr, dataLen);
      const hash = blake2AsU8a(data, 256);

      l.debug(() => ['blake2_256', [dataPtr, dataLen, outPtr], '<-', u8aToHex(data), '->', u8aToHex(hash)]);

      heap.set(outPtr, hash);
    },
    ed25519_verify: (msgPtr: Pointer, msgLen: number, sigPtr: Pointer, pubkeyPtr: Pointer): number => {
      l.debug(() => ['ed25519_verify', [msgPtr, msgLen, sigPtr, pubkeyPtr]]);

      return naclVerify(
        heap.get(msgPtr, msgLen),
        heap.get(sigPtr, 64),
        heap.get(pubkeyPtr, 32)
      ) ? 0 : 5;
    },
    twox_128: (dataPtr: Pointer, dataLen: number, outPtr: Pointer): void =>
      twox(128, dataPtr, dataLen, outPtr),
    twox_256: (dataPtr: Pointer, dataLen: number, outPtr: Pointer): void =>
      twox(256, dataPtr, dataLen, outPtr)
  };
};
