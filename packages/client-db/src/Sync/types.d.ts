// Copyright 2017-2018 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

export type MessageType = 'checkpoint' | 'commit' | 'del' | 'get' | 'put' | 'revert' | 'root';

export type Message = {
  buffer: Uint8Array | null,
  key: Uint8Array,
  state: Int32Array,
  type: MessageType,
  value: Uint8Array
}
