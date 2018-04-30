// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { State$Section, State$Definition$Section, WrapDbInterface } from '../types';

const expandMethod = require('./method');

module.exports = function expandSection (section: State$Definition$Section, db: WrapDbInterface): State$Section {
  const methodNames = Object.keys(section);

  return methodNames.reduce((result: State$Section, name: string): State$Section => {
    result[name] = expandMethod(section[name], db);

    return result;
  }, ({}: State$Section));
};
