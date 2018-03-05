// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Options } from 'yargs';

module.exports = ({
  'dev-gen-blocks': {
    default: false,
    description: '(unused) Generate sample blocks',
    type: 'boolean'
  }
}: { [key: string]: Options });
