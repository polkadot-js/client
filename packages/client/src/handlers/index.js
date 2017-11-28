// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { HandlerType } from '@polkadot/client-rpc/types';

type EndpointType = {
  [string]: HandlerType
};

module.exports = ({}: EndpointType);
