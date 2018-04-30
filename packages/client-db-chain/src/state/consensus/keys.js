// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const key = require('@polkadot/client-db/key');

module.exports = {
  AUTHORITY_H: key(':auth:', true),
  AUTHORITY_U: key(':auth:', false),
  AUTHORITY_LENGTH: key(':auth:len', false)
};
