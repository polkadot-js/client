// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { RuntimeEnv } from '../types';

module.exports = function clear ({ l, db }: RuntimeEnv, key: Uint8Array): void {
  l.debug('clear_storage', '<-', key.toString());

  db.del(key);
};
