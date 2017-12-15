// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { AccountIdType, BlockNumberType, HeaderHashType, ParachainIdType, SignatureType } from '@polkadot/primitives/base';
import type { RoleType } from '@polkadot/primitives/role';
import type { MessageInterface } from '../types';
import type { StatusMessageInterface } from './types';

const BN = require('bn.js');

const roleFromId = require('@polkadot/primitives/role/fromId');
const roleToId = require('@polkadot/primitives/role/toId');
const assert = require('@polkadot/util/assert');
const bnToHex = require('@polkadot/util/bn/toHex');
const bufferToHex = require('@polkadot/util/buffer/toHex');
const bufferToNumber = require('@polkadot/util/buffer/toNumber');
const hexToBn = require('@polkadot/util/hex/toBn');
const hexToBuffer = require('@polkadot/util/hex/toBuffer');
const numberToBuffer = require('@polkadot/util/number/toBuffer');
const isObject = require('@polkadot/util/is/object');

const defaults = require('../defaults');
const BaseMessage = require('./base');

module.exports = class StatusMessage extends BaseMessage implements MessageInterface, StatusMessageInterface {
  static MESSAGE_ID: number = 0;

  version: number = defaults.PROTOCOL_VERSION;
  roles: Array<RoleType>;
  bestNumber: BlockNumberType;
  bestHash: HeaderHashType;
  genesisHash: HeaderHashType;
  validatorSignature: ?SignatureType;
  validatorId: ?AccountIdType;
  parachainId: ?ParachainIdType;

  constructor (data: $Shape<StatusMessageInterface> = {}) {
    super(StatusMessage.MESSAGE_ID);

    assert(isObject(data), 'Expected data or undefined');

    this.roles = data.roles || ['none'];
    this.bestNumber = data.bestNumber || new BN(0);
    this.bestHash = data.bestHash || '0x0';
    this.genesisHash = data.genesisHash || '0x0';
    this.validatorSignature = data.validatorSignature || '0x0';
    this.validatorId = data.validatorId || '0x0';
    this.parachainId = data.parachainId || new BN(0);
  }

  _rawDecodeRlp (raw: Array<any>): void {
    assert(Array.isArray(raw), 'Expected raw message Array');
    assert(raw.length >= 5, 'Expected correct message length');

    const [version, roles, bestNumber, bestHash, genesisHash, validatorSignature, validatorId, parachainId] = raw;

    // TODO: Use from @polkadot/primitives-rlp
    this.version = bufferToNumber(version);
    this.roles = roles.map(bufferToNumber).map(roleFromId);
    this.bestNumber = hexToBn(bufferToHex(bestNumber));
    this.bestHash = bufferToHex(bestHash);
    this.genesisHash = bufferToHex(genesisHash);
    this.validatorSignature = bufferToHex(validatorSignature || Buffer.from([]));
    this.validatorId = bufferToHex(validatorId || Buffer.from([]));
    this.parachainId = hexToBn(bufferToHex(parachainId || Buffer.from([])));
  }

  _rawEncodeRlp (): Array<any> {
    // TODO: Use from @polkadot/primitives-rlp
    return [
      numberToBuffer(this.version),
      this.roles.map(roleToId).map(numberToBuffer),
      hexToBuffer(bnToHex(this.bestNumber)),
      hexToBuffer(this.bestHash),
      hexToBuffer(this.genesisHash),
      hexToBuffer(this.validatorSignature || '0x0'),
      hexToBuffer(this.validatorId || '0x0'),
      hexToBuffer(bnToHex(this.parachainId || new BN(0)))
    ];
  }
};
