// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { MessageInterface } from '../types';
import type { PeerState } from './types';

const u8aToBuffer = require('@polkadot/util/u8a/toBuffer');

const encode = require('../message/encode');

module.exports = function send (self: PeerState, message: MessageInterface): boolean {
  try {
    self.pushable.push(
      u8aToBuffer(
        encode(message)
      )
    );
  } catch (error) {
    return false;
  }

  return true;
};
