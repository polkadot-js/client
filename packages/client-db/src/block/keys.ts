// Copyright 2017-2019 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import createFunction from '@polkadot/api-metadata/storage/fromMetadata/createFunction';
import { StorageEntryMetadata, StorageEntryType } from '@polkadot/types/Metadata/v7/Storage';
import { createType, Text, Vec } from '@polkadot/types';
import { isString } from '@polkadot/util';
import { blake2AsU8a } from '@polkadot/util-crypto';

interface SubstrateMetadata {
  documentation: Array<string>;
  type: string | { key: string, value: string };
}

const prefix = 'Block';
const section = 'Block';

// Small helper function to factorize code on this page.
const createMethod = (method: string, key: string, { documentation, type }: SubstrateMetadata) => {
  const creator = createFunction(
    {
      method,
      prefix,
      meta: {
        documentation: new Vec(Text, documentation),
        modifier: createType('StorageEntryModifierV7', 1), // new StorageFunctionModifier(1), // default
        type: new StorageEntryType(type, isString(type) ? 0 : 1),
        toJSON: (): any =>
          key
      } as StorageEntryMetadata,
      section
    },
    { key, skipHashing: true }
  );

  return ((...args: Array<any>): Uint8Array =>
    blake2AsU8a(creator(...args))
  ) as any;
};

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
