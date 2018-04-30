// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BaseDbInterface, Db, State$Definition, State, State$SectionNames } from './types';

const createSection = require('./create/section');
const wrapDb = require('./wrap');

module.exports = function db (baseDb: BaseDbInterface, definition: State$Definition): Db {
  const wrapped = wrapDb(baseDb);
  const state = Object
    .keys(definition)
    .reduce((result: State, name: State$SectionNames): Db => {
      result[name] = createSection(definition[name], wrapped);

      return result;
    }, ({}: State));

  return ({
    ...state,
    ...wrapped
  }: $Shape<Db>);
};
