// Copyright 2017-2018 @polkadot/client-p2p authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { MessageInterface } from '../types';
import type { PeerState } from './types';

const u8aToBuffer = require('@polkadot/util/u8a/toBuffer');

const encode = require('../message/encode');

module.exports = function send ({ l, pushable }: PeerState, message: MessageInterface): boolean {
  if (pushable === undefined) {
    return false;
  }

  try {
    pushable.push(
      u8aToBuffer(
        encode(message)
      )
    );
  } catch (error) {
    l.error('send error', error);
    return false;
  }

  return true;
};
