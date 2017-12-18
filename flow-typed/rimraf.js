// https://github.com/flowtype/flow-typed/blob/a453e98ea234b73978d9139a048f0ef05f10b40e/definitions/npm/rimraf_v2.x.x/flow_v0.25.0-/rimraf_v2.x.x.js
// @flow

declare module 'rimraf' {
  declare type Options = {
    maxBusyTries?: number,
    emfileWait?: number,
    glob?: boolean,
    disableGlob?: boolean
  };

  declare type Callback = (err: ?Error, path: ?string) => void;

  declare module.exports: {
    (path: string, opts?: Options | Callback, callback?: Callback): void;
    sync (path: string, opts?: Options): void;
  };
}
