// Copyright 2017-2019 @polkadot/client-sync authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

const MAX_REQUEST_BLOCKS = 128;

export default {
  MAX_REQUEST_BLOCKS,
  MAX_QUEUED_BLOCKS: MAX_REQUEST_BLOCKS * 8,
  MIN_IDLE_BLOCKS: 16
};
