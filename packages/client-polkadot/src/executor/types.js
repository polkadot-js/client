// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

export type CallResult = {
  lo: number,
  hi: number
};

export type CallType = (...data: Array<Uint8Array>) => CallResult;

export type CallU8aType = (...data: Array<Uint8Array>) => Uint8Array;

export type CallCreator = (name: string) => CallType;

export type CallCreatorU8a = (name: string) => CallU8aType;
