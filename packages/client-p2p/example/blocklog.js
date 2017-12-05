// ISC, Copyright 2017 Jaco Greeff
// @flow

// const keccakAsBuffer = require('@polkadot/util/keccak/asBuffer');
// const { bootstrapNodes } = require('ethereum-common');
//
// const DevP2p = require('../src/devp2p');
//
// process.on('unhandledRejection', (error, promise) => {
//   console.error('Unhandled Rejection', promise, error);
//   // application specific logging, throwing an error, or other logic here
// });
//
// const p2p = new DevP2p({
//   bootnodes: bootstrapNodes.map(({ ip, port }) => ({
//     address: ip,
//     port
//   })),
//   clientId: 'blocklog/0.0.0',
//   privateKey: keccakAsBuffer(new Date().toString()),
//   port: 0
// });
//
// p2p.onError(({ type, message }) => {
//   console.error('ERROR', type, message);
// });
