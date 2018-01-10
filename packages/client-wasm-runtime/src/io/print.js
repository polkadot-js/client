// ISC, Copyright 2017-2018 Jaco Greeff
// @flow

import type { Logger } from '@polkadot/util/types';

const utf8Decode = require('../util/utf8Decode');

module.exports = function print (l: Logger, data: Uint8Array): void {
  l.log(
    utf8Decode(data)
  );
};
