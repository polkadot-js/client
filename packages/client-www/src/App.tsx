// Copyright 2017-2019 @polkadot/client-www authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { MessageConsole, MessageImported, MessageInformant } from './types';

import React from 'react';
import styled from 'styled-components';
import { formatNumber } from '@polkadot/util';

// Workers are not supported as of now - WebRTC cannot work inside a webworker
import Client from '@polkadot/client';
// const ClientWorker = require('worker-loader?name=[name].[hash:8].js!./worker');

import Intro from './Intro';
import config from './config';

interface Props {
  className?: string;
}

type State = MessageInformant & {};

const SCROLLING: ScrollIntoViewOptions = { behavior: 'smooth' };

class App extends React.PureComponent<Props, State> {
  private console?: HTMLElement;

  public state: State = {
    bestNumber: '-',
    numPeers: 0,
    status: 'Idle'
  };

  public constructor (props: Props) {
    super(props);

    this.initClient();
  }

  public render (): React.ReactNode {
    const { className } = this.props;
    const { bestNumber, numPeers, status } = this.state;

    return (
      <div className={className}>
        <Intro />
        <div
          className='console'
          ref={this.setConsole}
        />
        <div className='informant'>
          <div>
            <label>best</label>
            <div>#{formatNumber(bestNumber as any)}</div>
          </div>
          <div>
            <label>peers</label>
            <div>{numPeers}</div>
          </div>
          <div>
            <label>status</label>
            <div>{status}</div>
          </div>
        </div>
      </div>
    );
  }

  private initClient (): void {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    console.error = this.consoleHook('error');
    // eslint-disable-next-line @typescript-eslint/unbound-method
    console.log = this.consoleHook('log');
    // eslint-disable-next-line @typescript-eslint/unbound-method
    console.warn = this.consoleHook('warn');

    const client = new Client();

    client.start(config).catch((error): void => {
      console.error('FATAL: Failed to start client', error.message);
    });

    client.on('imported', this.onInformant);
    client.on('informant', this.onInformant);
  }

  private consoleHook (type: 'error' | 'log' | 'warn'): (...args: string[]) => void {
    return (...args: string[]): void =>
      this.onConsole({ text: args.join(' '), type });
  }

  private onConsole = ({ text, type }: MessageConsole): void => {
    if (this.console) {
      const pre = document.createElement('pre');
      const txt = document.createTextNode(text);

      pre.appendChild(txt);
      pre.classList.add(type);

      this.console.append(pre);
      pre.scrollIntoView(SCROLLING);

      while (this.console.childElementCount > 512) {
        this.console.childNodes[0].remove();
      }
    }
  }

  private onInformant = (data: MessageInformant | MessageImported): void => {
    this.setState(data as State);
  }

  private setConsole = (ref: HTMLDivElement): void => {
    this.console = ref;
  }
}

export default styled(App)`
  .console {
    pre {
      margin: 0;
      padding: 0.125rem 0.25rem;

      &.error {
        color: white;
        background: red;
      }

      &.warn {
        color: black;
        background: yellow;
      }
    }
  }

  .informant {
    position: fixed;
    top: 0.25rem;
    right: 0.25rem;

    > div {
      background: #282d35;
      color: #eee;
      display: inline-block;
      border-radius: 0.25rem;
      margin: 0.25rem;
      padding: 0.5rem 1rem;
      text-align: right;

      > label {
        font-family: sans-serif;
        font-size: 0.75rem;
        opacity: 0.5;
      }

      > div {
        font-family: monospace;
        font-size: 1.5rem;
      }
    }
  }
`;
