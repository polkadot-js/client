// Copyright 2017-2019 @polkadot/client-cli authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Options } from 'yargs';

import defaults from '@polkadot/client-signal/defaults';

const config: Record<string, Options> = {
  'signal-active': {
    default: false,
    description: 'Activate the (optional) WebRTC signalling server',
    type: 'boolean'
  },
  'signal-port': {
    default: defaults.PORT,
    description: 'Default port to listen on',
    type: 'number'
  }
};

export default config;
