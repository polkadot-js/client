// Copyright 2017-2018 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import OverlayDb from './Overlay';
import SyncDb from './Sync';

export default class MemoryDb extends OverlayDb {
  constructor () {
    super(new SyncDb());
  }
}
