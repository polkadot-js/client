// ISC, Copyright 2017 Jaco Greeff
// @flow

const allRoles = require('@polkadot/client-types/role/all');

module.exports = {
  role: {
    choices: ((Object.keys(allRoles): any): Array<mixed>),
    default: 'none',
    description: 'Sets the type of role the node operates as',
    demandOption: true,
    type: 'string'
  }
};
