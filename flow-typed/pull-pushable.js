// @flow

declare module 'pull-pushable' {
  declare interface Pushable {
    push: (buffer: Buffer) => void
  }

  declare module.exports: () => Pushable;
}
