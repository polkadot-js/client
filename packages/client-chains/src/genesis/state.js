// Copyright 2017-2018 @polkadot/client-chains authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ChainState, ChainGenesisState } from '../types';

const hexToU8a = require('@polkadot/util/hex/toU8a');

module.exports = function genesisState ({ stateDb: { db } }: ChainState, initial: ChainGenesisState): void {
  Object.keys(initial).forEach((key) =>
    db.set(hexToU8a(key), hexToU8a(initial[key]))
  );

  db.commit();
};
