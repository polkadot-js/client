// Copyright 2017-2019 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

/// <reference types="node"/>

declare namespace WorkerThreads {
  class MessageChannel {
    port1: MessagePort;
    port2: MessagePort;
  }

  class MessagePort {
    on (type: 'message', db: (message: any) => any): void
    postMessage (message: any, transferList?: Array<any>): void;
  }

  type WorkerOptions = {
    eval?: boolean,
    stderr?: boolean,
    stdin?: boolean,
    stdout?: boolean,
    workerData?: any
  }

  class Worker extends MessagePort {
    readonly threadId: number;

    constructor (path: string, options?: WorkerOptions);

    on (type: 'error' | 'exit' | 'online' | 'message', cb?: (...params: any[]) => any): void;
    ref (): void;
    unref (): void;
    terminate (cb?: (error: Error | null) => any): void;
  }
}

declare module 'worker_threads' {
  const MessageChannel: typeof WorkerThreads.MessageChannel;
  const MessagePort: typeof WorkerThreads.MessagePort;
  const Worker: typeof WorkerThreads.Worker;
  const parentPort: WorkerThreads.MessagePort;

  export {
    MessageChannel,
    MessagePort,
    Worker,
    parentPort
  };
}
