// Copyright 2017-2019 @polkadot/client-www authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Client from '@polkadot/client';

import config from './config';

type Props = {};
type State = {};

const SCROLLING: ScrollIntoViewOptions = { behavior: 'smooth' };

const Wrapper = styled.div`
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
`;

export default class App extends React.PureComponent<Props, State> {
  private client: Client;
  private logsEnd?: HTMLDivElement;
  private wrapper?: HTMLElement;
  state: State = {};

  constructor (props: Props) {
    super(props);

    console.error = this.consoleHook('error');
    console.log = this.consoleHook('log');
    console.warn = this.consoleHook('warn');

    this.client = new Client();
    this.client.start(config).catch((error) => {
      console.error('Failed to start client', error);
    });
  }

  render () {
    return (
      <Wrapper ref={this.setWrapper}>
        <div ref={this.setLogsEnd} />
      </Wrapper>
    );
  }

  private consoleHook (type: 'error' | 'log' | 'warn') {
    return (...args: Array<string>) => {
      if (this.wrapper && this.logsEnd) {
        const pre = document.createElement('pre');
        const txt = document.createTextNode(args.join(' '));

        pre.appendChild(txt);
        pre.classList.add(type);

        this.wrapper.insertBefore(pre, this.logsEnd);
        this.logsEnd.scrollIntoView(SCROLLING);
      }
    };
  }

  private setWrapper = (wrapper: HTMLDivElement) => {
    this.wrapper = wrapper;
  }

  private setLogsEnd = (logsEnd: HTMLDivElement) => {
    this.logsEnd = logsEnd;
  }
}

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error(`Unable to find element with id 'root'`);
}

ReactDOM.render(<App />, rootElement);
