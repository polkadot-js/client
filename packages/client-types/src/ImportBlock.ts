// Copyright 2017-2019 @polkadot/client-types authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Struct, Vector } from '@polkadot/types/codec';
import { Bytes, Header } from '@polkadot/types';

import BlockData from './BlockData';

export default class ImportBlock extends Struct {
  constructor ({ body, header: { blockNumber, extrinsicsRoot, parentHash, stateRoot } }: BlockData) {
    super({
      header: Header,
      body: Vector.with(Bytes)
    }, {
      header: {
        extrinsicsRoot,
        number: blockNumber,
        parentHash,
        stateRoot
      },
      body
    });
  }
}
