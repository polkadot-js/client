// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { UncheckedRaw } from '@polkadot/primitives/extrinsic';
import type { ExecutorState } from '../types';

const methods = require('@polkadot/extrinsics');
const encodeUnchecked = require('@polkadot/extrinsics-codec/encode/unchecked');
const createHeader = require('@polkadot/primitives-builder/header');
const decodeHeader = require('@polkadot/primitives-codec/header/decode');
const encodeBlock = require('@polkadot/primitives-codec/block/encode');
const encodeHeader = require('@polkadot/primitives-codec/header/encode');
const bnToBn = require('@polkadot/util/bn/toBn');
const keyring = require('@polkadot/util-keyring/testingPairs')();

const applyExtrinsic = require('./applyExtrinsic');
const finaliseBlock = require('./finaliseBlock');
const initialiseBlock = require('./initialiseBlock');

module.exports = function generateBlock (self: ExecutorState, _number: number | BN, _extrinsics: Array<UncheckedRaw>, timestamp: number): Uint8Array {
  const start = Date.now();
  const number = bnToBn(_number);

  self.l.debug(() => `Generating block #${number.toString()}`);

  const extrinsics = [
    // encodeUnchecked(keyring.nobody, 0)(
    //   methods.timestamp.public.set,
    //   [0x5b13c3a4]
    // ),
    // encodeUnchecked(keyring.nobody, 0)(
    //   methods.parachains.public.setHeads,
    //   [[]]
    // )
    encodeUnchecked(keyring.nobody, 0)(
      methods.timestamp.public.set,
      [timestamp]
    ),
    encodeUnchecked(keyring.nobody, 0)(
      methods.parachains.public.setHeads,
      [[]]
    )
  ].concat(_extrinsics);

  const parentHash = self.stateDb.system.blockHashAt.get(number.subn(1));
  const header = createHeader({
    number,
    parentHash
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
