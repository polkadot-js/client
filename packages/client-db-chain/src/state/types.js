// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ChainDb$State$Consensys } from './consensys/types';
import type { ChainDb$State$Governance } from './governance/types';
import type { ChainDb$State$Session } from './session/types';
import type { ChainDb$State$Staking } from './staking/types';
import type { ChainDb$State$System } from './system/types';

export type ChainDb$State = {
  clear: () => void,
  commit: () => void,
  consensys: ChainDb$State$Consensys,
  governance: ChainDb$State$Governance,
  session: ChainDb$State$Session,
  staking: ChainDb$State$Staking,
  system: ChainDb$State$System,
  trieRoot: () => Uint8Array
}
