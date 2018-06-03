// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { ExecutorState } from '../types';

const methods = require('@polkadot/extrinsics');
const encodeSigned = require('@polkadot/extrinsics-codec/encode/sign');
const createHeader = require('@polkadot/primitives-builder/header');
const encodeBlock = require('@polkadot/primitives-codec/block/encodeRaw');
const encodeHeader = require('@polkadot/primitives-codec/header/encode');
const bnToBn = require('@polkadot/util/bn/toBn');
const keyring = require('@polkadot/util-keyring/testingPairs')();

const applyExtrinsic = require('./applyExtrinsic');
const finaliseBlock = require('./finaliseBlock');
const initialiseBlock = require('./initialiseBlock');

module.exports = function generateBlock (self: ExecutorState, _number: number | BN, _extrinsics: Array<Uint8Array>, timestamp: number): Uint8Array {
  const start = Date.now();
  const number = bnToBn(_number);

  self.l.debug(() => `Generating block #${number.toString()}`);

  const extrinsics = [
    encodeSigned(keyring.nobody, 0)(
      methods.timestamp.public.set,
      [timestamp]
    ),
    encodeSigned(keyring.nobody, 0)(
      methods.parachains.public.setHeads,
      [[]]
    )
  ].concat(_extrinsics);

  const parentHash = self.stateDb.system.blockHashAt.get(number.subn(1));
  const empty = encodeHeader(
    createHeader({
      number,
      parentHash
    }, extrinsics)
  );

  initialiseBlock(self, empty);

  // FIXME Not sure why this is needed, this is due to the implementation with overlays
  self.stateDb.timestamp.didUpdate.del();
  self.stateDb.parachains.didUpdate.del();

  extrinsics.forEach((extrinsic) =>
    applyExtrinsic(self, extrinsic)
  );

  const header = finaliseBlock(self, empty);
  const block = encodeBlock(header, extrinsics);

  self.stateDb.db.clear();

  self.l.log(() => `Block #${number.toString()} generated (${Date.now() - start}ms)`);

  return block;
};
