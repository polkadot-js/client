// Copyright 2017-2018 @polkadot/client-db-chain authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { CreateItems, Section } from '@polkadot/params/types';

const param = require('@polkadot/params/param');
const createSection = require('@polkadot/params/section');

type Block$Sections = 'block';

const name: Block$Sections = 'block';

module.exports = (createSection(name)(
  (createMethod: CreateItems<Block$Sections>) => ({
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
): Section<Block$Sections>);
