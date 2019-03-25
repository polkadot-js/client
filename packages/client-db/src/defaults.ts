// Copyright 2017-2019 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { DbConfig$Type } from './types';

import os from 'os';
import path from 'path';

const PATH = path.join(os.homedir(), '.polkadot-js');
const TYPE: DbConfig$Type = 'file';

export default {
  PATH,
  TYPE
};
