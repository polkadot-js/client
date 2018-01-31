// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const naclVerify = require('@polkadot/util-crypto/nacl/verify');

module.exports = function ed25519Verify (message: Uint8Array, signature: Uint8Array, publicKey: Uint8Array): number {
  return naclVerify(message, signature, publicKey)
    ? 0
    : 5;
};
