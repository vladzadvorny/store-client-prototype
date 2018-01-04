import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { Provider as ReduxProvider } from 'react-redux';

import client from './apollo';
import store from './store';
import Router from './routes';
import locale from './locale';

locale(store);

const App = () => (
  <ApolloProvider client={client}>
    <ReduxProvider store={store}>
      <Router />
    </ReduxProvider>
  </ApolloProvider>
);

export default App;
