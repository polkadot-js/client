// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Storage$Key$Values } from '../types';

export type Creator = (keyParams?: Storage$Key$Values) => Uint8Array;
