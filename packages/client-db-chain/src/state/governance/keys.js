// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const key = require('@polkadot/client-db/key');

module.exports = {
  APPROVAL_OF: key('gov:app:'),
  APPROVALS_RATIO: key('gov:apr'),
  CURRENT_PROPOSAL: key('gov:pro')
};
