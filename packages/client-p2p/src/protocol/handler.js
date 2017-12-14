// ISC, Copyright 2017 Jaco Greeff
// @flow

const assert = require('@polkadot/util/assert');

const defaults = require('../defaults');

module.exports = function protocolHandler (protocol: string, conn: any): void {
  assert(protocol === defaults.PROTOCOL, `Expected matching protocol, '${protocol}' received`);

  console.log('Connection received', conn);
  // pull(conn, conn)
};
