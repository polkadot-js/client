// Copyright 2017-2019 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { RuntimeEnv, RuntimeInterfaceCrypto, Pointer } from '../types';

import { u8aToHex } from '@polkadot/util';
import { blake2AsU8a, keccakAsU8a, naclVerify, schnorrkelVerify, xxhashAsU8a, secp256k1Recover } from '@polkadot/util-crypto';

import instrument from '../instrument';

// TODO: This _could_ be useful elsewhere, but as of now not moving it since it is used only here
function u8aDisplay (u8a: Uint8Array): string {
  let isHex = false;

  return u8a.reduce((result, ch): string => {
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

export default function crypto ({ l, heap }: RuntimeEnv): RuntimeInterfaceCrypto {
  const twox = (bitLength: number, dataPtr: Pointer, dataLen: number, outPtr: Pointer): void => {
    const data = heap.get(dataPtr, dataLen);
    const hash = xxhashAsU8a(data, bitLength);

    l.debug((): any[] => [`twox_${bitLength}`, [dataPtr, dataLen, outPtr], '<-', u8aDisplay(data), '->', u8aToHex(hash)]);

    heap.set(outPtr, hash);
  };

  return {
    // eslint-disable-next-line @typescript-eslint/camelcase
    blake2_256: (dataPtr: Pointer, dataLen: number, outPtr: Pointer): void =>
      instrument('blake2_256', (): void => {
        const data = heap.get(dataPtr, dataLen);
        const hash = blake2AsU8a(data, 256);

        l.debug((): any[] => ['blake2_256', [dataPtr, dataLen, outPtr], '<-', u8aToHex(data), '->', u8aToHex(hash)]);

        heap.set(outPtr, hash);
      }),
    // eslint-disable-next-line @typescript-eslint/camelcase
    ed25519_verify: (msgPtr: Pointer, msgLen: number, sigPtr: Pointer, pubkeyPtr: Pointer): number =>
      instrument('ed25519_verify', (): number => {
        const m = heap.get(msgPtr, msgLen);
        const s = heap.get(sigPtr, 64);
        const p = heap.get(pubkeyPtr, 32);

        l.debug((): any[] => ['ed25519_verify', [msgPtr, msgLen, sigPtr, pubkeyPtr], '<-', { m, p, s }]);

        try {
          return naclVerify(m, s, p) ? 0 : 5;
        } catch (error) {
          return 5;
        }
      }),
    // eslint-disable-next-line @typescript-eslint/camelcase
    keccak_256: (dataPtr: Pointer, dataLen: number, outPtr: Pointer): void =>
      instrument('keccak_256', (): void => {
        const data = heap.get(dataPtr, dataLen);
        const hash = keccakAsU8a(data);

        l.debug((): any[] => ['keccak_256', [dataPtr, dataLen, outPtr], '<-', u8aToHex(data), '->', u8aToHex(hash)]);

        heap.set(outPtr, hash);
      }),
    // eslint-disable-next-line @typescript-eslint/camelcase
    secp256k1_ecdsa_recover: (msgPtr: Pointer, sigPtr: Pointer, pubkeyPtr: Pointer): number =>
      instrument('secp256k1_ecdsa_recover', (): number => {
        const m = heap.get(msgPtr, 32);
        const s = heap.get(sigPtr, 65);

        l.debug((): any[] => ['secp256k1_ecdsa_recover', [msgPtr, sigPtr, pubkeyPtr], '<-', { m, s }]);

        try {
          const publicKey = secp256k1Recover(m, s, 0);

          heap.set(pubkeyPtr, publicKey);
        } catch (error) {
          return 5;
        }

        return 0;
      }),
    // eslint-disable-next-line @typescript-eslint/camelcase
    sr25519_verify: (msgPtr: Pointer, msgLen: number, sigPtr: Pointer, pubkeyPtr: Pointer): number =>
      instrument('sr25519_verify', (): number => {
        const m = heap.get(msgPtr, msgLen);
        const s = heap.get(sigPtr, 64);
        const p = heap.get(pubkeyPtr, 32);

        l.debug((): any[] => ['sr25519_verify', [msgPtr, msgLen, sigPtr, pubkeyPtr], '<-', { m, s, p }]);

        try {
          return schnorrkelVerify(m, s, p) ? 0 : 5;
        } catch (error) {
          return 5;
        }
      }),
    // eslint-disable-next-line @typescript-eslint/camelcase
    twox_128: (dataPtr: Pointer, dataLen: number, outPtr: Pointer): void =>
      instrument('twox_128', (): void =>
        twox(128, dataPtr, dataLen, outPtr)
      ),
    // eslint-disable-next-line @typescript-eslint/camelcase
    twox_256: (dataPtr: Pointer, dataLen: number, outPtr: Pointer): void =>
      instrument('twox_128', (): void =>
        twox(256, dataPtr, dataLen, outPtr)
      )
  };
}
