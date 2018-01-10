// @flow

declare module 'deasync' {
  declare module.exports: {
    loopWhile: (fn: () => boolean) => void;
    runLoopOnce: () => void;
    sleep: (ms: number) => void;
  }
}
