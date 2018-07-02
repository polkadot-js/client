// Copyright 2017-2018 @polkadot/client-telemetry authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Level, Message } from './types';

export default class Base {
  readonly level: Level;
  readonly message: string;
  readonly timestamp: Date = new Date();

  constructor (message: Message, level: Level = 'INFO') {
    this.level = level;
    this.message = message;
  }

  toJSON (): any {
    return {
      level: this.level,
      msg: this.message,
      ts: this.timestamp.toString()
    };
  }
}
