// Copyright 2017-2019 @polkadot/client-telemetry authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Level, Message, BaseJson } from './types';

export default class Base {
  public readonly level: Level;

  public readonly message: Message;

  public readonly timestamp: Date = new Date();

  public constructor (message: Message, level: Level = 'INFO') {
    this.level = level;
    this.message = message;
  }

  public toJSON (): BaseJson {
    return {
      level: this.level,
      msg: this.message,
      ts: this.timestamp.toISOString()
    };
  }
}
