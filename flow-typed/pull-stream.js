// @flow

declare module 'pull-stream' {
  declare module.exports: {
    (mixed, mixed): void;
    drain: (handler: (message: Buffer) => void, errorHandler?: () => boolean) => void;
  }
}
