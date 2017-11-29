// ISC, Copyright 2017 Jaco Greeff
// @flow

import BN from 'bn.js';

export type BytesType = Buffer;
export type HashType = string;
export type H160Type = string;
export type H256Type = string;
export type U64Type = number;
export type U256Type = BN;

export type AccountIdType = H160Type;
export type BalanceType = U256Type;
export type BlockNumberType = U64Type;
export type ChainIdType = U64Type;
export type ObjectIdType = U64Type;
export type ProportionType = U64Type;
export type SignatureType = HashType;
export type TimestampType = U64Type;
export type TxOrderType = U64Type;
