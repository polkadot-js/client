// Copyright 2017-2018 @polkadot/client-wasm authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { UncheckedRaw } from '@polkadot/primitives/extrinsic';
import { ExecutorState } from '../types';

import createHeader from '@polkadot/primitives/create/header';
import decodeHeader from '@polkadot/primitives/codec/header/decode';
import encodeBlock from '@polkadot/primitives/codec/block/encode';
import encodeHeader from '@polkadot/primitives/codec/header/encode';

import applyExtrinsic from './applyExtrinsic';
import finaliseBlock from './finaliseBlock';
import withInherent from './inherentExtrinsics';
import initialiseBlock from './initialiseBlock';

export default function generateBlock (self: ExecutorState, _extrinsics: Array<UncheckedRaw>, timestamp: number): Uint8Array {
  const start = Date.now();
  // tslint:disable-next-line:variable-name
  const number = self.blockDb.bestNumber.get().addn(1);

  self.l.debug(() => `Generating block #${number.toString()}`);

  const extrinsics = withInherent(self, timestamp, _extrinsics);
  const header = createHeader({
    number,
    parentHash: self.blockDb.bestHash.get()
  }, extrinsics);
  const headerRaw = encodeHeader(header);

  initialiseBlock(self, headerRaw);
  extrinsics.forEach((extrinsic) =>
    applyExtrinsic(self, extrinsic)
  );

  const { stateRoot } = decodeHeader(
    finaliseBlock(self, headerRaw)
  );
  const block = encodeBlock({
    extrinsics,
    header: {
      ...header,
      stateRoot
    }
  });

  self.stateDb.db.clear();

  self.l.log(() => `Block #${number.toString()} generated (${Date.now() - start}ms)`);

  return block;
}
