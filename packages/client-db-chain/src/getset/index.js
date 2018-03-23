// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const kBvU = require('./kBvU');
const kNvB = require('./kNvB');
const kNvU = require('./kNvU');
const kUvB = require('./kUvB');
const kUvU = require('./kUvU');

module.exports = {
  k32vU: kBvU(32),
  k64vU: kBvU(64),
  kNv32: kNvB(32),
  kNv64: kNvB(64),
  kNvU,
  kUv64: kUvB(64),
  kUvU
};
