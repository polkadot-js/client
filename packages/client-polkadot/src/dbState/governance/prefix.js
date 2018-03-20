// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const u8aFromString = require('@polkadot/util/u8a/fromString');

module.exports = {
  APPROVAL_OF: u8aFromString('gov:app:'),
  APPROVALS_RATIO: u8aFromString('gov:apr'),
  CURRENT_PROPOSAL: u8aFromString('gov:pro')
};
