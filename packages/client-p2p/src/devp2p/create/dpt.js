// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { P2pEmitFunc } from '../../types';
import type { DevP2pConfigType } from '../types';

const bufferToHex = require('@polkadot/util/buffer/toHex');
const l = require('@polkadot/util/logger')('devp2p/dpt');
const EthDevP2p = require('ethereumjs-devp2p');

const defaults = require('../../defaults');

module.exports = function createDpt ({ address = defaults.ADDRESS, clientId = defaults.CLIENT_ID, port = defaults.PORT, privateKey = defaults.PRIVATE_KEY }: DevP2pConfigType, emit: P2pEmitFunc): EthDevP2p.DPT {
  l.log('Initialising');

  const dpt = new EthDevP2p.DPT(
    privateKey,
    {
      clientId,
      endpoint: {
        address,
        udpPort: null,
        tcpPort: null
      }
    }
  );

  dpt.on('error', (error) => {
    emit('discover.error', error);
  });

  dpt.on('peer:added', ({ address, id, tcpPort, udpPort }) => {
    emit('discover.peer.added', {
      peer: {
        address,
        id: bufferToHex(id),
        tcpPort,
        udpPort
      },
      total: dpt.getPeers().length
    });
  });

  dpt.on('peer:removed', ({ id }) => {
    emit('discover.peer.removed', {
      peer: {
        id: bufferToHex(id)
      },
      total: dpt.getPeers().length
    });
  });

  if (port) {
    dpt.bind(port, address);
  }

  return dpt;
};
