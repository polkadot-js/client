// Copyright 2017-2018 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import SyncDb from '../Sync';
import HashBaseDb from './Base';

export default class HashDiskDb extends HashBaseDb {
  constructor (path: string, withCompact: boolean = false) {
    super(new SyncDb('disk', path, false, withCompact));
  }
}
