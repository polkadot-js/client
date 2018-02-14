// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { AccountIdType, BlockNumberType, HeaderHashType, ParachainIdType, SignatureType } from '@polkadot/primitives/base';
import type { RoleType } from '@polkadot/primitives/role';
import type { MessageInterface } from '../types';
import type { StatusMessageInterface } from './types';

const BN = require('bn.js');

const roleFromId = require('@polkadot/primitives/role/fromId');
const roleToId = require('@polkadot/primitives/role/toId');
const { accountIdDecode, accountIdEncode } = require('@polkadot/primitives-rlp/accountId');
const { blockNumberDecode, blockNumberEncode } = require('@polkadot/primitives-rlp/blockNumber');
const { hashDecode, hashEncode } = require('@polkadot/primitives-rlp/hash');
const { parachainIdDecode, parachainIdEncode } = require('@polkadot/primitives-rlp/parachainId');
const { signatureDecode, signatureEncode } = require('@polkadot/primitives-rlp/signature');
const assert = require('@polkadot/util/assert');
const hexToU8a = require('@polkadot/util/hex/toU8a');
const u8aToBn = require('@polkadot/util/u8a/toBn');
const numberToU8a = require('@polkadot/util/number/toU8a');

const defaults = require('../defaults');
const BaseMessage = require('./base');

module.exports = class StatusMessage extends BaseMessage implements MessageInterface, StatusMessageInterface {
  static MESSAGE_ID: number = 0;

  version: number = defaults.PROTOCOL_VERSION;
  roles: Array<RoleType>;
  bestNumber: BlockNumberType;
  bestHash: HeaderHashType;
  genesisHash: HeaderHashType;
  validatorSignature: SignatureType;
  validatorId: AccountIdType;
  parachainId: ParachainIdType;

  constructor ({ roles = ['none'], bestNumber = new BN(0), bestHash = hexToU8a('0x00', 256), genesisHash = hexToU8a('0x00', 256), validatorSignature = hexToU8a('0x00', 512), validatorId = hexToU8a('0x00', 160), parachainId = new BN(0) }: $Shape<StatusMessageInterface> = {}) {
    super(StatusMessage.MESSAGE_ID);

    this.roles = roles;
    this.bestNumber = bestNumber;
    this.bestHash = bestHash;
    this.genesisHash = genesisHash;
    this.validatorSignature = validatorSignature;
    this.validatorId = validatorId;
    this.parachainId = parachainId;
  }

  // flowlint-next-line unclear-type:off
  _rawDecode (raw: Array<any>): void {
    assert(raw.length >= 5, 'Expected correct message length');

    const [version, roles, bestNumber, bestHash, genesisHash, validatorSignature, validatorId, parachainId] = raw;

    this.version = u8aToBn((version: Uint8Array)).toNumber();
    this.roles = roles.map((role) => u8aToBn(role).toNumber()).map(roleFromId);
    this.bestNumber = blockNumberDecode(bestNumber);
    this.bestHash = hashDecode(bestHash);
    this.genesisHash = hashDecode(genesisHash);
    this.validatorSignature = signatureDecode(validatorSignature);
    this.validatorId = accountIdDecode(validatorId);
    this.parachainId = parachainIdDecode(parachainId);
  }

  // flowlint-next-line unclear-type:off
  _rawEncode (): Array<any> {
    return [
      numberToU8a(this.version),
      this.roles.map(roleToId).map(numberToU8a),
      blockNumberEncode(this.bestNumber),
      hashEncode(this.bestHash, 256),
      hashEncode(this.genesisHash, 256),
      signatureEncode(this.validatorSignature),
      accountIdEncode(this.validatorId),
      parachainIdEncode(this.parachainId)
    ];
  }
};
