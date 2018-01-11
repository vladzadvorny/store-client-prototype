import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { Provider as ReduxProvider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import client from './apollo';
import store from './store';
import Routes from './routes';
import locale from './locale';
import history from './history';

locale(store);

const App = () => (
  <ApolloProvider client={client}>
    <ReduxProvider store={store}>
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    </ReduxProvider>
  </ApolloProvider>
);

export default App;
