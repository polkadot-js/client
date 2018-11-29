// Copyright 2017-2018 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { ProgressValue } from '@polkadot/db/types';
import { DbConfig$Type } from '../types';

export type MessageTypeRead = 'get' | 'getRoot' | 'hasRoot';

export type MessageTypeWrite = '__init' | 'checkpoint' | 'commit' | 'del' | 'put' | 'revert' | 'setRoot';

export type MessageType = MessageTypeRead | MessageTypeWrite;

export type MessageData = {
  buffer: Uint8Array,
  key?: Uint8Array,
  port?: WorkerThreads.MessagePort,
  value?: Uint8Array
};

export type Message = MessageData & {
  state: Int32Array,
  type: MessageType
};

export type WorkerData = {
  isTrie: boolean,
  path: string,
  type: DbConfig$Type
};

export type ProgressMessage = {
  isCompleted: boolean,
  progress: ProgressValue
};
