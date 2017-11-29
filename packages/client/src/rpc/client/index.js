// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { EndpointType } from '../types';

const version = require('./version');

module.exports = ({
  'client_version': version
}: EndpointType);
