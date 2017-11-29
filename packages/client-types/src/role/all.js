// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { RoleType } from './index';

const MAPPING: { [RoleType]: number } = {
  none: 0b00000000,
  full: 0b00000001,
  light: 0b00000010,
  collator: 0b00000100,
  validator: 0b00001000
};

module.exports = MAPPING;
