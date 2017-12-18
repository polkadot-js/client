// @flow

import type { MemDown } from 'memdown';
import type { LevelDown } from 'leveldown';

declare interface LevelUp$AbstractStorage {}

declare module 'levelup' {
  declare class LevelUp {
    /* constructor (provider: LevelUp$AbstractStorage): LevelUp; */
    constructor (provider: MemDown | LevelDown): LevelUp;
  }

  declare module.exports: typeof LevelUp;
}
