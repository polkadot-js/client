// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Trie$Pairs } from '../types';

const bufferToU8a = require('@polkadot/util/buffer/toU8a');
const keccakAsBuffer = require('@polkadot/util-crypto/keccak/asBuffer');
const rlp = require('rlp');

const encode = require('./encode');

module.exports = function genRoot (pairs: Trie$Pairs): string {
  return bufferToU8a(
    keccakAsBuffer(
      rlp.encode(
        // $FlowFixMe rlp definition is not 100%
        encode(pairs, 0)
      )
    )
  );
};
