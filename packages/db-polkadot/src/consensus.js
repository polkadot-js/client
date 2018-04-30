// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { State$Definition$Section } from '@polkadot/db/types';

module.exports = ({
  authority: {
    key: ':auth:',
    params: ['u32']
  },
  'authority(unhashed)': {
    isUnhashed: true,
    key: ':auth:',
    params: ['u32']
  },
  authorityLength: {
    isUnhashed: true,
    key: ':auth:len',
    type: 'u32'
  }
}: State$Definition$Section);
