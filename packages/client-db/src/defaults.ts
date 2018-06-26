// Copyright 2017-2018 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { DbPathPrefix, DbConfig$Type } from './types';

import os from 'os';
import path from 'path';

const PREFIX_DB: DbPathPrefix = 'database';
const PATH = path.join(os.homedir(), '.@polkadot');
const TYPE: DbConfig$Type = 'memory';

export default {
  PREFIX_DB,
  PATH,
  TYPE
};
