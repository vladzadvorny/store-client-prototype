import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { Provider as ReduxProvider } from 'react-redux';
import { initialize, addTranslation } from 'react-localize-redux';
import getLocale from 'browser-locale';

import client from './apollo';
import store from './store';
import Router from './routes';
import globalTranslation from './assets/global';

const languages = ['en', 'ru'];
const locale = getLocale()
  .split('-')[0]
  .toLowerCase();
store.dispatch(
  initialize(languages, {
    defaultLanguage: languages.indexOf(locale) === -1 ? languages[0] : locale
  })
);
store.dispatch(addTranslation(globalTranslation));

const App = () => (
  <ApolloProvider client={client}>
    <ReduxProvider store={store}>
      <Router />
    </ReduxProvider>
  </ApolloProvider>
);

export default App;
