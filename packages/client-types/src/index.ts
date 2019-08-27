// Copyright 2017-2019 @polkadot/client-types authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

// Alexander has u64, newer has u32
import { getTypeRegistry } from '@polkadot/types';

getTypeRegistry().register({
  BlockNumber: 'u64',
  Index: 'u64'
});

export { default as BlockData } from './BlockData';
export { default as ImportBlock } from './ImportBlock';
export { default as TrieChanges } from './TrieChanges';
