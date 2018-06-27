// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { BlockAnnounceMessage } from '../types';
import { BlockAnnounceEncoded } from './types';

import headerDecode from '@polkadot/primitives/json/header/decode';

export default function rawDecode (raw: BlockAnnounceMessage, { header }: BlockAnnounceEncoded): BlockAnnounceMessage {
  raw.header = headerDecode(header);

  return raw;
}
