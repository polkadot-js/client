// Copyright 2017-2019 @polkadot/client-signal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

export type SignalConfig = {
  active: boolean,
  port: number
};

export interface SignalInterface {
  start (): Promise<boolean>;
  stop (): Promise<boolean>;
}
