// Copyright 2017-2018 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Logger } from '@polkadot/util/types';

import u8aToHex from '@polkadot/util/u8a/toHex';

export default function print (l: Logger, data: Uint8Array): void {
  l.warn(
    u8aToHex(data)
  );
}
