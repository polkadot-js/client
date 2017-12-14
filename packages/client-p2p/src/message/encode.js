// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { MessageTypeEnum, MessageType } from './types';

const ExtError = require('@polkadot/util/ext/error');

const statusEncode = require('./status/encode');

module.exports = function mesasageEncode (type: MessageTypeEnum, message: any): MessageType {
  switch (type) {
    case 'status':
      return {
        type,
        message: statusEncode(message)
      };

    default:
      throw new ExtError(`Unable to encode message for type '${type}'`);
  }
};
