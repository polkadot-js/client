// Copyright 2017-2019 @polkadot/client-rpc authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Rpc } from './types';

const PATH = '/';
const PORT = 9933;
const TYPES: Rpc[] = ['http', 'ws'];

export default {
  PATH,
  PORT,
  TYPES
};
