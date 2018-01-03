import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { ReduxCache } from 'apollo-cache-redux';

import store from './store';

const httpLink = createHttpLink({ uri: 'http://localhost:3001/graphql' });

const cache = new ReduxCache({ store });

export default new ApolloClient({
  link: httpLink,
  cache
});
