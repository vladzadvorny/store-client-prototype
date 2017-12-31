import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { withClientState } from 'apollo-link-state';
import { InMemoryCache } from 'apollo-cache-inmemory';
import merge from 'lodash.merge';

import user from './resolvers/user';

const httpLink = createHttpLink({ uri: 'http://localhost:3001/graphql' });

const cache = new InMemoryCache();

const stateLink = withClientState({ ...merge(user), cache });

export default new ApolloClient({
  link: ApolloLink.from([stateLink, httpLink]),
  cache
});
