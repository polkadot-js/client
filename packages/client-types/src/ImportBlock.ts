// Copyright 2017-2019 @polkadot/client-types authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Struct } from '@polkadot/types';

import BlockData from './BlockData';

export default class ImportBlock extends Struct {
  public constructor ({ body, header }: BlockData) {
    super({
      header: 'Header',
      body: 'Vec<Bytes>'
    }, {
      header: {
        // @ts-ignore This is spread-able...
        ...header.toJSON(),
        digest: {
          // remove all Seal logs (not sure about consensus)
          logs: header.digest.logsWithout('SealV0', 'Consensus')
        }
      },
      body
    });
  }
}
