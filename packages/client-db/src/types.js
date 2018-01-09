// ISC, Copyright 2017-2018 Jaco Greeff
// @flow

export type PathPrefixType = 'database';

export type DbConfigType = {
  path: string
};

export interface DbInterface {
  del: (key: string) => Promise<boolean>,
  get: (key: string) => Promise<Buffer>,
  put: (key: string, value: Buffer | string) => Promise<Buffer | string>
}
