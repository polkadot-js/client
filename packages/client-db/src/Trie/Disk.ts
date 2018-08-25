// Copyright 2017-2018 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import fs from 'fs';
import mkdirp from 'mkdirp';

import SyncDb from '../Sync';
import OverlayDb from './Overlay';

export default class DiskDb extends OverlayDb {
  readonly hasAtStart: boolean;

  constructor (path: string) {
    const hasAtStart = fs.existsSync(path);

    if (!hasAtStart) {
      mkdirp.sync(path);
    }

    super(new SyncDb('disk', path, true));

    this.hasAtStart = hasAtStart;
  }
}
