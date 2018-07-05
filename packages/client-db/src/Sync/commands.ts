// Copyright 2017-2018 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

// NOTE Start should be at 0x00 since it is the default value
const START = 0x00;
const SIZE = 0x01;
const FILL = 0x02;
const READ = 0x03;
const END = 0x0f;
const ERROR = 0xff;

export default {
  END,
  ERROR,
  FILL,
  READ,
  SIZE,
  START
};
