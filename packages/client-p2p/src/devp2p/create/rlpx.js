// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { P2pConfigType, P2pEmitFunc } from '../../types';

const l = require('@polkadot/util/logger')('devp2p/rlpx');
const EthDevP2p = require('ethereumjs-devp2p');

const defaults = require('../../defaults');

module.exports = function createRlpx ({ address = defaults.ADDRESS, clientId = defaults.CLIENT_ID, privateKey = defaults.PRIVATE_KEY, maxPeers = defaults.MAX_PEERS, port = defaults.PORT }: P2pConfigType, dpt: EthDevP2p.DPT, emit: P2pEmitFunc): EthDevP2p.RLPx {
  l.log('Initialising');

  const rlpx = new EthDevP2p.RLPx(
    privateKey,
    {
      clientId,
      dpt,
      maxPeers,
      capabilities: [
        EthDevP2p.ETH.eth63,
        EthDevP2p.ETH.eth62
      ],
      listenPort: null
    }
  );

  rlpx.on('error', (error) => {
    emit('comms.error', error);
  });

  if (port && port > 0) {
    rlpx.listen(port, address);
  }

  return rlpx;
};
