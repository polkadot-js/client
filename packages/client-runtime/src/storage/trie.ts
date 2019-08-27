// Copyright 2017-2019 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { RuntimeEnv, RuntimeInterfaceStorageTrie, Pointer } from '../types';

import { trieRootOrdered } from '@polkadot/trie-hash';
import { u8aToHex } from '@polkadot/util';

import instrument from '../instrument';
// import unimplemented from '../unimplemented';

export default function storage ({ l, heap, stateDb }: RuntimeEnv): RuntimeInterfaceStorageTrie {
  return {
    // eslint-disable-next-line @typescript-eslint/camelcase
    blake2_256_enumerated_trie_root: (valuesPtr: Pointer, lenPtr: Pointer, count: number, resultPtr: Pointer): void =>
      instrument('enumerated_trie_root', (): void => {
        const pairs = [...Array(count).keys()].map((index: number): Uint8Array => {
          const length = heap.getU32(lenPtr + (index * 4));
          const data = heap.get(valuesPtr, length);

          valuesPtr += length;

          return data;
        });
        const root = trieRootOrdered(pairs);

        l.debug((): any[] => ['enumerated_trie_root', [valuesPtr, lenPtr, count, resultPtr], '<-', pairs.length, '->', u8aToHex(root)]);

        heap.set(resultPtr, root);
      }),
    // eslint-disable-next-line @typescript-eslint/camelcase,@typescript-eslint/no-unused-vars
    storage_changes_root: (parentHashData: Pointer, parentHashLen: number, parentNumHi: number, parentNumLo: number, result: Pointer): number =>
      instrument('storage_changes_root', (): number => {
        // Stubbed, always assuming no changes
        // assert(parentHashLen === 32, `Expected hash length of 32, found ${parentHashLen}`);

        // const parentHash = heap.get(parentHashData, parentHashLen);
        // const root = db.getRoot();

        // console.error(parentHashData, parentHashLen, parentNumHi, parentNumLo, result, u8aToHex(parentHash), root.toString());

        // unimplemented('storage_changes_root');

        return 0;
      }),
    // eslint-disable-next-line @typescript-eslint/camelcase
    storage_root: (resultPtr: Pointer): void =>
      instrument('storage_root', (): void => {
        const root = stateDb.getRoot();

        l.debug((): any[] => ['storage_root', [resultPtr], '->', u8aToHex(root)]);

        heap.set(resultPtr, root);
      })
  };
}
