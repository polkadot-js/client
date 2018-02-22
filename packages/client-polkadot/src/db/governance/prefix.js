// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const u8aFromString = require('@polkadot/util/u8a/fromString');

const APPROVAL_OF: Uint8Array = u8aFromString('gov:app:');
const APPROVALS_REQUIRED: Uint8Array = u8aFromString('gov:apr');
const CURRENT_PROPOSAL: Uint8Array = u8aFromString('gov:pro');

module.exports = {
  APPROVAL_OF,
  APPROVALS_REQUIRED,
  CURRENT_PROPOSAL
};
