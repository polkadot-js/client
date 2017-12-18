// @flow

declare module 'memdown' {
  declare class MemDown /* implements LevelUp$AbstractStorage */ {
    constructor (): MemDown;
  }

  declare module.exports: typeof MemDown;
}
