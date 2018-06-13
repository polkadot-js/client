// Copyright 2017-2018 @polkadot/client-chains authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow
// flowlint untyped-import:off

import type { ChainGenesisState, ChainName } from '../types';

const dev = (require('./chain-dev.json'): ChainGenesisState);

module.exports = ({
  dev
}: { [ChainName]: ChainGenesisState });
