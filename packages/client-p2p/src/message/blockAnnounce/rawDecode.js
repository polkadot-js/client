// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BlockAnnounceMessage } from '../types';
import type { BlockAnnounceEncoded } from './types';

const headerDecode = require('@polkadot/primitives-json/header/decode');

module.exports = function rawDecode (raw: BlockAnnounceMessage, { header }: BlockAnnounceEncoded): BlockAnnounceMessage {
  raw.header = headerDecode(header);

  return raw;
};
