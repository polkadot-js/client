// Copyright 2017-2018 @polkadot/client authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Options } from 'yargs';

export default ({
  'dev-gen-blocks': {
    default: false,
    description: '(unused) Generate sample blocks',
    type: 'boolean'
  }
} as { [index: string]: Options });
