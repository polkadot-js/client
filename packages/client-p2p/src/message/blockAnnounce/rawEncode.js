// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BlockAnnounceMessage } from '../types';
import type { BlockAnnounceEncoded } from './types';

const headerEncode = require('@polkadot/primitives-json/header/encode');

module.exports = function rawEncode ({ header }: BlockAnnounceMessage): BlockAnnounceEncoded {
  return {
    header: headerEncode(header)
  };
};
