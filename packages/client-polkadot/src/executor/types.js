// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

export type CallResult = {
  lo: number,
  hi: number
};

export type CallType = (...data: Array<Uint8Array>) => CallResult;
