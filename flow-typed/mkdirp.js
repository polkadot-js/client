// @flow

declare module 'mkdirp' {
  declare type Options = {
    mode?: number
  };

  declare type Callback = (err: ?Error) => void;

  declare module.exports: {
    (path: string, opts?: Options | Callback, callback?: Callback): void;
    sync (path: string, opts?: Options): void;
  };
}
