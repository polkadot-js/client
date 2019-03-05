// Copyright 2017-2019 @polkadot/ui-identicon authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import React from 'react';
import ReactDOM from 'react-dom';

export default class App extends React.PureComponent {
  render () {
    return (
      <div>hello</div>
    );
  }
}

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error(`Unable to find element with id 'root'`);
}

ReactDOM.render(<App />, rootElement);
