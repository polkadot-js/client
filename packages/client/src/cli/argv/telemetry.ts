// Copyright 2017-2018 @polkadot/client authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Options } from 'yargs';

import defaults from '@polkadot/client-telemetry/defaults';

export default ({
  'telemetry-name': {
    default: '',
    description: 'Unique name of this node to report',
    type: 'string'
  },
  'telemetry-url': {
    default: defaults.URL,
    description: 'Websocket endpoint for telemetry stats',
    type: 'string'
  }
} as { [index: string]: Options });
