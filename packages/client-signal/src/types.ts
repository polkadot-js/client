// Copyright 2017-2019 @polkadot/client-signal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

export interface SignalConfig {
  active: boolean;
  port: number;
}

export interface SignalInterface {
  readonly numConnected: number;

  start (): Promise<boolean>;
  stop (): Promise<boolean>;
}

export interface SSSignal {
  type: 'offer' | 'answer';
  sdp: string;
}

export interface SSOffer {
  answer?: boolean;
  dstMultiaddr: string;
  err?: string;
  intentId: string;
  srcMultiaddr: string;
  signal: SSSignal;
}
