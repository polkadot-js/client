// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { StorageDef$Key$Values } from '../types';

export type Creator = (keyParams?: StorageDef$Key$Values) => Uint8Array;
