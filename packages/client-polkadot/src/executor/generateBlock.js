// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { CallCreatorU8a } from './types';

type BlockValues = {
  number: number,
  timestamp: number,
  transactions: Array<Uint8Array>
};

const createHeader = require('@polkadot/primitives-builder/blockHeader');
const rootRaw = require('@polkadot/primitives-builder/transaction/rootRaw');
const timestampSet = require('@polkadot/primitives-builder/unchecked/timestampSet');
const encodeBlockRaw = require('@polkadot/primitives-codec/block/encodeRaw');
const encodeHeader = require('@polkadot/primitives-codec/blockHeader/encode');
const encodeUtx = require('@polkadot/primitives-codec/unchecked/encode');

const executeTx = require('./executeTransaction');
const finaliseBlock = require('./finaliseBlock');

module.exports = function generateBlock (createCaller: CallCreatorU8a, stateDb: PolkadotStateDb, { number, timestamp, transactions }: BlockValues): Uint8Array {
  const alltxs = [ encodeUtx(timestampSet(timestamp)) ].concat(transactions);
  const transactionRoot = rootRaw(alltxs);
  const empty = encodeHeader(
    createHeader({
      number,
      parentHash: stateDb.system.getBlockHash(number - 1),
      transactionRoot
    })
  );
  const header = finaliseBlock(
    createCaller, alltxs.reduce((hdr, utx) => {
      return executeTx(createCaller, hdr, utx);
    }, empty)
  );
  const block = encodeBlockRaw(header, timestamp, transactions);

  stateDb.clear();

  return block;
};
