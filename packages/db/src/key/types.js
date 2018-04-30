// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { State$Key$ParamValues } from '../types';

export type Keygen = (...keyParams?: State$Key$ParamValues) => Uint8Array;
