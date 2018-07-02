// Copyright 2017-2018 @polkadot/client-telemetry authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import Base from './Base';

export default class Connected extends Base {
  readonly config: string = '';
  readonly chain: string;
  readonly name: string;

  constructor (chain: string, name: string) {
    super('system.connected');

    this.chain = chain;
    this.name = name;
  }

  toJSON (): any {
    return {
      ...super.toJSON(),
      chain: this.chain,
      config: this.config,
      name: this.name
    };
  }
}
