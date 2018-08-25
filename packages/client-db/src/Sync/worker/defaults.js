// Copyright 2017-2018 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const SHARED_BUFFER_SIZE = 4096;

const WAIT_TIMEOUT = process.env.NODE_ENV === 'test'
  ? 15000
  : 5000;

module.exports = {
  SHARED_BUFFER_SIZE,
  WAIT_TIMEOUT
};
