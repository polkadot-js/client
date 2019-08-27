// Copyright 2017-2019 @polkadot/client-telemetry authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { ConnectedJson } from './types';
import { name as implementation, version } from '@polkadot/client/clientId';
import Base from './Base';

export default class Connected extends Base {
  public readonly config: string = '';

  public readonly chain: string;

  public readonly name: string;

  public constructor (chain: string, name: string) {
    super('system.connected');

    this.chain = chain;
    this.name = name;
  }

  public toJSON (): ConnectedJson {
    return {
      ...super.toJSON(),
      chain: this.chain,
      config: this.config,
      implementation,
      name: this.name,
      version
    };
  }
}
