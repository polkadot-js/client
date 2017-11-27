// ISC, Copyright 2017 Jaco Greeff
// @flow

module.exports = {
  type: {
    choices: ['collator', 'observer', 'validator'],
    default: 'observer',
    description: 'Sets the type of node to operate',
    demandOption: true,
    type: 'string'
  }
};
