// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const key = require('@polkadot/client-db/key');

module.exports = {
  BEST_HASH: key('bst:hsh'),
  BEST_NUMBER: key('bst:num'),
  BLOCK_BY_HASH: key('blk:hsh:')
};
