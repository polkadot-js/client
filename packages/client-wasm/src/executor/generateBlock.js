// Copyright 2017-2018 @polkadot/client-wasm authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { UncheckedRaw } from '@polkadot/primitives/extrinsic';
import type { ExecutorState } from '../types';

const createHeader = require('@polkadot/primitives-builder/header');
const decodeHeader = require('@polkadot/primitives-codec/header/decode');
const encodeBlock = require('@polkadot/primitives-codec/block/encode');
const encodeHeader = require('@polkadot/primitives-codec/header/encode');

const applyExtrinsic = require('./applyExtrinsic');
const finaliseBlock = require('./finaliseBlock');
const withInherent = require('./inherentExtrinsics');
const initialiseBlock = require('./initialiseBlock');

module.exports = function generateBlock (self: ExecutorState, _extrinsics: Array<UncheckedRaw>, timestamp: number): Uint8Array {
  const start = Date.now();
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
};
