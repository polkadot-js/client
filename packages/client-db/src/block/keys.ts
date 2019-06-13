// Copyright 2017-2019 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import createFunction from '@polkadot/storage/fromMetadata/createFunction';
import { StorageFunctionMetadata, StorageFunctionModifier, StorageFunctionType } from '@polkadot/types/Metadata/v5/Storage';
import { Text, Vector } from '@polkadot/types';
import { isString } from '@polkadot/util';

interface SubstrateMetadata {
  documentation: Array<string>;
  type: string | { key: string, value: string };
}

// Small helper function to factorize code on this page.
const createMethod = (method: string, key: string, { documentation, type }: SubstrateMetadata) =>
  createFunction(
    new Text('Block'),
    new Text(method),
    {
      documentation: new Vector(Text, documentation),
      modifier: new StorageFunctionModifier(1), // default
      type: new StorageFunctionType(type, isString(type) ? 0 : 1),
      toJSON: (): any =>
        key
    } as StorageFunctionMetadata,
    { key, skipHashing: true }
  );

export default {
  bestHash: createMethod('bestHash', 'bst:hsh', {
    documentation: ['Best hash'],
    type: 'Hash'
  }),
  bestNumber: createMethod('bestNumber', 'bst:num', {
    documentation: ['Best block'],
    type: 'BlockNumber'
  }),
  blockByHash: createMethod('blockByHash', 'blk:hsh:', {
    documentation: ['Retrieve block by hash'],
    type: {
      key: 'Hash',
      value: 'Bytes'
    }
  }),
  hashByNumber: createMethod('hashByNumber', 'hsh:num:', {
    documentation: ['Retrieve hash by number'],
    type: {
      key: 'u256',
      value: 'Hash'
    }
  }),
  headerByHash: createMethod('headerByHash', 'hdr:hsh:', {
    documentation: ['Retrieve header by hash'],
    type: {
      key: 'Hash',
      value: 'Bytes'
    }
  })
};
