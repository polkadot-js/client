// @flow

declare module 'leveldown' {
  declare class LevelDown /* implements LevelUp$AbstractStorage */ {
    constructor (path: string): LevelDown;
  }

  declare module.exports: typeof LevelDown;
}
