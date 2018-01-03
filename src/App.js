import React from 'react';
import { ApolloProvider } from 'react-apollo';

import client from './apollo';
import Router from './routes';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => (
  <ApolloProvider client={client}>
    <div className="app">
      <Header />
      <Router />
      <Footer />
    </div>
  </ApolloProvider>
);

export default App;
