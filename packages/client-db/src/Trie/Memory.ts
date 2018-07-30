// Copyright 2017-2018 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import SyncDb from '../Sync';
import OverlayDb from './Overlay';

export default class MemoryDb extends OverlayDb {
  constructor () {
    super(new SyncDb('memory'));
  }
}
