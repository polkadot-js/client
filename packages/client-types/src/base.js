// ISC, Copyright 2017 Jaco Greeff
// @flow

import BN from 'bn.js';

export type Tbytes = Buffer;
export type THash = string;
export type TH160 = string;
export type TH256 = string;
export type TU64 = number;
export type TU256 = BN;

export type TAccountID = TH160;
export type TBalance = TU256;
export type TBlockNumber = TU64;
export type TChainID = TU64;
export type TObjectID = TU64;
export type TProportion = TU64;
export type TSignature = THash;
export type TTimestamp = TU64;
export type TTxOrder = TU64;
