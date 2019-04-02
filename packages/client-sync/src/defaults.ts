// Copyright 2017-2019 @polkadot/client-sync authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { SyncTypes } from './types';

const SYNC_DEFAULT: SyncTypes = 'light';
const MAX_REQUEST_BLOCKS = 128;
const MAX_QUEUED_BLOCKS = MAX_REQUEST_BLOCKS * 8;

export default {
  MAX_REQUEST_BLOCKS,
  MAX_QUEUED_BLOCKS,
  MIN_IDLE_BLOCKS: 16,
  MIN_QUEUE_SIZE: MAX_QUEUED_BLOCKS / 2,
  SYNC_DEFAULT
};
