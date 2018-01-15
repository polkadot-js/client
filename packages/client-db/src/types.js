// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

export type PathPrefixType = 'database';

export type DbConfigType = {
  path: string
};

export interface DbInterface {
  del (key: string): Promise<boolean>,
  get (key: string): Promise<Buffer>,
  put (key: string, value: Buffer | string): Promise<Buffer | string>
}
