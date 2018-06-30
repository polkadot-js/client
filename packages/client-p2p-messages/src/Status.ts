// Copyright 2017-2018 @polkadot/client-p2p-messages authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { AccountId, BlockNumber, HeaderHash, ParaChainId, Signature } from '@polkadot/primitives/base';
import { Role } from '@polkadot/primitives/role';
import { MessageEncoder, StatusEncoded, StatusMessage } from './types';

import accountIdDecode from '@polkadot/primitives/json/accountId/decode';
import bnDecode from '@polkadot/primitives/json/bn/decode';
import hashDecode from '@polkadot/primitives/json/hash/decode';
import parachainIdDecode from '@polkadot/primitives/json/parachainId/decode';
import signatureDecode from '@polkadot/primitives/json/signature/decode';

// import bnEncode from '@polkadot/primitives/json/bn/encode';
import hashEncode from '@polkadot/primitives/json/hash/encode';

export default class Status implements MessageEncoder<StatusEncoded>, StatusMessage {
  static type = 0;
  readonly type = Status.type;

  bestHash: HeaderHash;
  bestNumber: BlockNumber;
  genesisHash: HeaderHash;
  parachainId: ParaChainId | null;
  roles: Array<Role>;
  validatorSignature: Signature | null;
  validatorId: AccountId | null;
  version: number;

  constructor ({ bestHash, bestNumber, genesisHash, parachainId = null, roles, validatorId = null, validatorSignature = null, version }: StatusMessage) {
    this.bestHash = bestHash;
    this.bestNumber = bestNumber;
    this.genesisHash = genesisHash;
    this.parachainId = parachainId;
    this.roles = roles;
    this.validatorId = validatorId;
    this.validatorSignature = validatorSignature;
    this.version = version;
  }

  encode (): StatusEncoded {
    return {
      Status: {
        best_hash: hashEncode(this.bestHash, 256),
        best_number: this.bestNumber.toNumber(), // bnEncode(bestNumber, 64),
        genesis_hash: hashEncode(this.genesisHash, 256),
        roles: this.roles.map((role) =>
          `${role.charAt(0).toUpperCase()}${role.slice(1)}`
        ),
        version: this.version,
        // TODO actual values as required
        parachain_id: null,
        validator_id: null,
        validator_signature: null
      }
    };
  }

  static decode ({ Status: { best_hash, best_number, genesis_hash, parachain_id, roles, validator_id, validator_signature, version } }: StatusEncoded): Status {
    return new Status({
      bestNumber: bnDecode(best_number.toString(), 64),
      bestHash: hashDecode(best_hash, 256),
      genesisHash: hashDecode(genesis_hash, 256),
      parachainId: parachain_id
        ? parachainIdDecode(parachain_id)
        : null,
      roles: roles.map((role) =>
        role.toLocaleLowerCase() as Role
      ),
      validatorId: validator_id
        ? accountIdDecode(validator_id)
        : null,
      validatorSignature: validator_signature
        ? signatureDecode(validator_signature)
        : null,
      version
    });
  }
}
