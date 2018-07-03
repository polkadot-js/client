// Copyright 2017-2018 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

// import { Message } from './types';

// import { parentPort } from 'worker_threads';
const { parentPort } = require('worker_threads');

// import commands from './commands';
// Dangit, also doesn't reolve .ts here... erk :(
// const commands = require('./commands').default;
const commands = {
  START: 0x00,
  END: 0x0f,
  ERROR: 0xff
};

// function setState (state: Int32Array, command: number): void {
function setState (state, command) {
  state[0] = command;
  Atomics.wake(state, 0, +Infinity);
}

// function handleTimeout (state: Int32Array): void {
function handleTimeout (state) {
  setTimeout(() => {
    setState(state, commands.END);
  }, 1000);
}

// function error (state: Int32Array): void {
function error (state) {
  setState(state, commands.ERROR);
}

// parentPort.on('message', ({ state, type }: Message) => {
parentPort.on('message', ({ state, type }) => {
  switch (type) {
    case 'timeout':
      return handleTimeout(state);

    default:
      return error(state);
  }
});
