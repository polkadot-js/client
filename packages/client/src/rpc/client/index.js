// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Endpoint } from '../../types';

const version = require('./version');

module.exports = ({
  'client_version': version
}: Endpoint);
