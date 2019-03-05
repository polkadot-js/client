// Copyright 2017-2019 @polkadot/client-rpc authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { RpcConfig } from '../types';

import { assert } from '@polkadot/util';

import defaults from '../defaults';

export default function validateConfig ({ path, types }: RpcConfig): void {
  assert(/^\//.test(path), 'Expected valid path');
  assert(types.length !== 0, 'Expected non-empty type Array');

  const invalid = types
    .filter((_type) => !defaults.TYPES.includes(_type))
    .map((type) => `'${type}'`)
    .join(', ');

  assert(invalid.length === 0, `Invalid RPC type found: ${invalid}`);
}
