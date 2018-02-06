// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const bufferToU8a = require('@polkadot/util/buffer/toU8a');
const rlp = require('rlp');

const asNibbles = require('./util/asNibbles');
const genRoot = require('./util/genRoot');
const pairsUniq = require('./util/pairsUniq');

module.exports = function trieRootOrdered (values: Array<Uint8Array>): string {
  return genRoot(
    pairsUniq(
      values.map((v, index) => ({
        k: asNibbles(
          bufferToU8a(
            // $FlowFixMe rlp type definition is lacking
            rlp.encode(index)
          )
        ),
        v
      }))
    )
  );
};
