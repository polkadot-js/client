// Copyright 2017-2018 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Logger } from '@polkadot/util/types';

import { u8aToString } from '@polkadot/util';

export default function print (l: Logger, data: Uint8Array): void {
  l.warn(
    u8aToString(data)
  );
}
