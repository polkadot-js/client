// ISC, Copyright 2017 Jaco Greeff
// @flow

const defaults = require('@polkadot/client-p2p/defaults');

module.exports = {
  'p2p-address': {
    default: defaults.ADDRESS,
    description: 'The interface to bind to (p2p-port > 0)',
    type: 'string'
  },
  'p2p-max-peers': {
    default: defaults.MAX_PEERS,
    description: 'The maximum allowed peers',
    type: 'number'
  },
  'p2p-port': {
    default: defaults.PORT,
    description: 'Sets the peer-to-peer port, 0 for non-listening mode',
    type: 'number'
  },
  'p2p-type': {
    choices: ['devp2p', 'libp2p'],
    default: 'devp2p',
    description: 'Sets the peer-to-peer communications protocol',
    type: 'string'
  }
};
