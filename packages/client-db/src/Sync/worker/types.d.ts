// Copyright 2017-2019 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Message } from '../types';

type Fn = (message: Message) => any;

export type FnMap = {
  checkpoint: Fn,
  commit: Fn,
  del: Fn,
  get: Fn,
  put: Fn,
  revert: Fn,
  root: Fn
};
