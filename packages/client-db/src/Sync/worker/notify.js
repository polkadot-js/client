// Copyright 2017-2018 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const commands = require('./commands');

const exitCommands = [
  commands.END, commands.ERROR
];

// Sets the state and wakes any Atomics waiting on the current state to change.
// If we are not done, assume that we will have to do something afterwards, so
// enter a wait period.
// function notify (state: Int32Array, command: number): void {
function notify (state, command) {
  state[0] = command;

  Atomics.notify(state, 0, 1);

  if (!exitCommands.includes(command)) {
    Atomics.wait(state, 0, command);
  }
}

// Waits on a function (returning a promise) to complete. Notify either on end or
// error, discarding the actual result.
// async function notifyOnDone (state: Int32Array, fn: () => Promise<any>): Promise<void> {
async function notifyOnDone (state, fn) {
  try {
    await fn();
    notify(state, commands.END);
  } catch (error) {
    notify(state, commands.ERROR);
  }
}

// Send the value (caller got it from a function return) back to the parent. Since the result
// may be quite large, we do this is phases -
//   - send the actual size of the result first
//   - loop through the actual result, sending buffer.length bytes per iteration
//   - since most results are smaller, the 4K buffer should capture a lot, but :code is >250K
// async function notifyOnValue (state: Int32Array, buffer: Uint8Array, fn: () => Promise<Uint8Array | null>): Promise<void> {
async function notifyOnValue (state, buffer, fn) {
  const view = new DataView(buffer.buffer);
  let value; // : Uint8Array | null = null;

  try {
    value = await fn();
  } catch (error) {
    return notify(state, commands.ERROR);
  }

  if (!value) {
    return notify(state, commands.END);
  }

  const size = value.length;
  let offset = 0;

  view.setUint32(0, size);
  notify(state, commands.SIZE);

  while (offset !== size) {
    const available = Math.min(buffer.length, size - offset);

    buffer.set(value.subarray(offset, offset + available), 0);
    offset += available;

    notify(state, offset !== size
      ? commands.READ
      : commands.END
    );
  }
}

module.exports = {
  notifyOnDone,
  notifyOnValue
};
