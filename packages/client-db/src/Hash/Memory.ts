// Copyright 2017-2018 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import memdown from 'memdown';

import HashBaseDb from './Base';

export default class HashMemoryDb extends HashBaseDb {
  constructor () {
    super('memory');
  }
}
