// Copyright 2017-2019 @polkadot/client-types authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Bytes, Header, Struct, Vector } from '@polkadot/types';

import BlockData from './BlockData';

export default class ImportBlock extends Struct {
  constructor ({ body, header }: BlockData) {
    super({
      header: Header,
      body: Vector.with(Bytes)
    }, {
      header: {
        ...header.toJSON(),
        digest: {
          // remove all Seal logs (not susre about consensus)
          logs: header.digest.logs.filter((item) =>
            !item.isSeal // && !item.isConsensus
          )
        }
      },
      body
    });
  }
}
