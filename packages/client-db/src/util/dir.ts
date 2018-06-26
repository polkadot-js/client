// Copyright 2017-2018 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { DbPathPrefix } from '../types';

import mkdirp from 'mkdirp';
import path from 'path';

export default function createDir (rootDir: string, prefix: DbPathPrefix, subDir: string): string {
  const location = path.join(rootDir, prefix, subDir);

  mkdirp.sync(location);

  return location;
}
