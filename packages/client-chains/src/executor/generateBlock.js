// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { ChainState } from '../types';

const createHeader = require('@polkadot/primitives-builder/header');
const rootRaw = require('@polkadot/primitives-builder/transaction/rootRaw');
const timestampSet = require('@polkadot/primitives-builder/unchecked/timestampSet');
const encodeBlockRaw = require('@polkadot/primitives-codec/block/encodeRaw');
const encodeHeader = require('@polkadot/primitives-codec/header/encode');
const encodeUtx = require('@polkadot/primitives-codec/unchecked/encode');
const bnToBn = require('@polkadot/util/bn/toBn');

const executeTx = require('./executeTransaction');
const finaliseBlock = require('./finaliseBlock');

module.exports = function generateBlock (self: ChainState, _number: number | BN, utxs: Array<Uint8Array>, timestamp: number): Uint8Array {
  const start = Date.now();
  const number = bnToBn(_number);

  self.l.debug(() => `Generating block #${number.toString()}`);

  const txs = [ encodeUtx(timestampSet(timestamp)) ].concat(utxs);
  const transactionRoot = rootRaw(txs);
  const empty = encodeHeader(
    createHeader({
      number,
      parentHash: self.stateDb.system.getBlockHash(number.subn(1)),
      transactionRoot
    })
  );
  const header = finaliseBlock(self, txs.reduce((hdr, utx) => {
    return executeTx(self, hdr, utx);
  }, empty));
  const block = encodeBlockRaw(header, timestamp, utxs);

  self.stateDb.clear();

  self.l.log(() => `Block #${number.toString()} generated (${Date.now() - start}ms)`);

  return block;
};
