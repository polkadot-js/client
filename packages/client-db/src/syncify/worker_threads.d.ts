// Copyright 2017-2018 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

/// <reference types="node"/>

declare namespace WorkerThreads {
  interface ParentPort {
    on (type: 'message', db: (message: any) => any): void
  }

  class Worker {
    constructor (path: string);

    postMessage (message: any): void;
    terminate (): void;
  }
}

declare module 'worker_threads' {
  const Worker: typeof WorkerThreads.Worker;
  const parentPort: WorkerThreads.ParentPort;

  export {
    Worker,
    parentPort
  };
}
