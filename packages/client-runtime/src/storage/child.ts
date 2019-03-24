// Copyright 2017-2019 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { RuntimeInterface$Storage$Child, RuntimeEnv, Pointer } from '../types';

import unimplemented from '../unimplemented';

export default function child (env: RuntimeEnv): RuntimeInterface$Storage$Child {
  return {
    set_child_storage: (storageKeyData: Pointer, storageKeyLen: number, keyData: Pointer, keyLen: number, valueData: Pointer, valueLen: number): void =>
      unimplemented('set_child_storage'),
    clear_child_storage: (storageKeyData: Pointer, storageKeyLen: number, keyData: Pointer, keyLen: number): void =>
      unimplemented('clear_child_storage'),
    exists_child_storage: (storageKeyData: Pointer, storageKeyLen: number, keyData: Pointer, keyLen: number): number =>
      unimplemented('exists_child_storage'),
    kill_child_storage: (storageKeyData: Pointer, storageKeyLen: number): void =>
      unimplemented('kill_child_storage'),
    get_allocated_child_storage: (storageKeyData: Pointer, storageKeyLen: number, keyData: Pointer, keyLen: number, writtenOut: Pointer): Pointer =>
      unimplemented('get_allocated_child_storage'),
    get_child_storage_into: (storageKeyData: Pointer, storageKeyLen: number, keyData: Pointer, keyLen: number, valueData: Pointer, valueLen: number, valueOffset: number): number =>
      unimplemented('get_child_storage_into'),
    child_storage_root: (storageKeyData: Pointer, storageKeyLen: number, writtenOut: Pointer): Pointer =>
      unimplemented('child_storage_root')
  };
}
