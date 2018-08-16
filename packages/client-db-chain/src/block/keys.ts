// Copyright 2017-2018 @polkadot/client-db-chain authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { CreateItems, Section } from '@polkadot/params/types';

import param from '@polkadot/params/param';
import createSection from '@polkadot/params/section';

type Blocks = {
  block: Section<Blocks, any, any>
};

const name: keyof Blocks = 'block';

export default (createSection(name)(
  (createMethod: CreateItems<Blocks>) => ({
    description: 'Block storage (internal)',
    public: {
      bestHash: createMethod('bestHash')({
        description: 'Best hash',
        key: 'bst:hsh',
        params: [],
        type: 'Hash'
      }),
      bestNumber: createMethod('bestNumber')({
        description: 'Best block',
        key: 'bst:num',
        params: [],
        type: 'BlockNumber'
      }),
      blockByHash: createMethod('blockByHash')({
        description: 'Retrieve block by hash',
        params: [
          param('hash', 'Hash')
        ],
        key: 'blk:hsh:',
        type: 'Bytes'
      }),
      headerByHash: createMethod('headerByHash')({
        description: 'Retrieve header by hash',
        params: [
          param('hash', 'Hash')
        ],
        key: 'hdr:hsh:',
        type: 'Bytes'
      })
    }
  })
) as Section<Blocks, any, any>);
