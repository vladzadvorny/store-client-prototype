import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';

import { uri } from './config';
import store from './store';
import { signOut } from './actions';

const httpLink = createUploadLink({ uri });

const middlewareLink = setContext(() => ({
  headers: {
    'x-token': localStorage.getItem('token'),
    'x-refresh-token': localStorage.getItem('refreshToken'),
    'x-locale': localStorage.getItem('locale')
  }
}));

const afterwareLink = new ApolloLink((operation, forward) =>
  forward(operation).map(response => {
    const { response: { headers } } = operation.getContext();
    if (headers) {
      const token = headers.get('x-token');
      const refreshToken = headers.get('x-refresh-token');

      if (token) {
        if (token !== 'remove') {
          localStorage.setItem('token', token);
        } else {
          localStorage.removeItem('token');
          store.dispatch(signOut());
        }
      }

      if (refreshToken) {
        if (refreshToken !== 'remove') {
          localStorage.setItem('refreshToken', refreshToken);
        } else {
          localStorage.removeItem('refreshToken');
          store.dispatch(signOut());
        }
      }
    }

    return response;
  })
);

const link = afterwareLink.concat(middlewareLink.concat(httpLink));

export default new ApolloClient({
  link,
  cache: new InMemoryCache()
});
