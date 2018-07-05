// Copyright 2017-2018 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

export type MessageTypeRead = 'get' | 'root';

export type MessageTypeWrite = 'checkpoint' | 'commit' | 'del' | 'put' | 'revert';

export type MessageType = MessageTypeRead | MessageTypeWrite;

export type MessageData = {
  buffer?: Uint8Array,
  key?: Uint8Array,
  value?: Uint8Array
}

export type Message = MessageData & {
  state: Int32Array,
  type: MessageType
}
