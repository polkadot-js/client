// Copyright 2017-2019 @polkadot/client authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

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
