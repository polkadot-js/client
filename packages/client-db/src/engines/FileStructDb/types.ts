// Copyright 2017-2019 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

export interface KeyParts {
  buffer: Uint8Array;
  fileAt: number;
  nibbles: Uint8Array;
}

export interface KeyInfo {
  keyAt: number;
  keyData: Uint8Array;
}

export interface ValInfo {
  valAt: number;
  valData: Uint8Array | null;
  valSize: number;
}

export type KVInfo = KeyInfo & ValInfo;

export interface ParsedHdr {
  isKey: boolean;
  linkTo: number;
}

export interface ParsedKey {
  valAt: number;
  valSize: number;
}
