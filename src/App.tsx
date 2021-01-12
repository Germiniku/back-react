import React from 'react';
import Router from './router';
import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import { Route } from 'react-router-dom';

interface IApp {
  history: History;
}

function App({ history }: IApp) {
  return (
    <ConnectedRouter history={history}>
      <Route />
    </ConnectedRouter>
  );
}

export default App;
