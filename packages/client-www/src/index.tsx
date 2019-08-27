// Copyright 2017-2019 @polkadot/client-www authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Message$Console, Message$Imported, Message$Informant } from './types';

import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { formatNumber } from '@polkadot/util';

// Workers are not supported as of now - WebRTC cannot work inside a webworker
import Client from '@polkadot/client';
// const ClientWorker = require('worker-loader?name=[name].[hash:8].js!./worker');

import Intro from './Intro';
import config from './config';

type Props = {};
type State = Message$Informant & {};

const SCROLLING: ScrollIntoViewOptions = { behavior: 'smooth' };

const Wrapper = styled.div`
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

export default class App extends React.PureComponent<Props, State> {
  private console?: HTMLElement;
  state: State = {
    bestNumber: '-',
    numPeers: 0,
    status: 'Idle'
  };

  constructor (props: Props) {
    super(props);

    this.initClient();
  }

  render () {
    const { bestNumber, numPeers, status } = this.state;

    return (
      <Wrapper>
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
      </Wrapper>
    );
  }

  private initClient () {
    console.error = this.consoleHook('error');
    console.log = this.consoleHook('log');
    console.warn = this.consoleHook('warn');

    const client = new Client();

    client.start(config).catch((error) => {
      console.error('FATAL: Failed to start client', error.message);
    });

    client.on('imported', this.onInformant);
    client.on('informant', this.onInformant);
  }

  private consoleHook (type: 'error' | 'log' | 'warn') {
    return (...args: string[]): void =>
      this.onConsole({ text: args.join(' '), type });
  }

  private onConsole = ({ text, type }: Message$Console): void => {
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

  private onInformant = (data: Message$Informant | Message$Imported): void => {
    this.setState(data as State);
  }

  private setConsole = (ref: HTMLDivElement): void => {
    this.console = ref;
  }
}

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error(`Unable to find element with id 'root'`);
}

ReactDOM.render(<App />, rootElement);
