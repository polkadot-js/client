// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { ExecutorState } from '../types';

const createHeader = require('@polkadot/primitives-builder/header');
const rootRaw = require('@polkadot/primitives-builder/extrinsic/rootRaw');
const encodeBlockRaw = require('@polkadot/primitives-codec/block/encodeRaw');
const encodeHeader = require('@polkadot/primitives-codec/header/encode');
const bnToBn = require('@polkadot/util/bn/toBn');

const applyExtrinsic = require('./applyExtrinsic');
const finaliseBlock = require('./finaliseBlock');

module.exports = function generateBlock (self: ExecutorState, _number: number | BN, extrinsics: Array<Uint8Array>): Uint8Array {
  const start = Date.now();
  const number = bnToBn(_number);

  self.l.debug(() => `Generating block #${number.toString()}`);

  const extrinsicsRoot = rootRaw(extrinsics);
  const empty = encodeHeader(
    createHeader({
      number,
      parentHash: self.stateDb.system.blockHashAt.get(number.subn(1)),
      extrinsicsRoot
    })
  );
  const header = finaliseBlock(self, extrinsics.reduce((hdr, utx) => {
    return applyExtrinsic(self, hdr, utx);
  }, empty));
  const block = encodeBlockRaw(header, extrinsics);

  self.stateDb.db.clear();

  self.l.log(() => `Block #${number.toString()} generated (${Date.now() - start}ms)`);

  return block;
};
