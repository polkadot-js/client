// Copyright 2017-2018 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

/// <reference types="node"/>

declare namespace WorkerThreads {
  interface ParentPort {
    on (type: 'message', db: (message: any) => any): void
  }

  type WorkerOptions = {
    eval?: boolean,
    stderr?: boolean,
    stdin?: boolean,
    stdout?: boolean,
    workerData?: any
  }

  class Worker {
    readonly threadId: number;

    constructor (path: string, options?: WorkerOptions);

    postMessage (message: any): void;
    terminate (cb?: (error: Error | null) => any): void;
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
