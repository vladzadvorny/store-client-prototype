import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import history from './history';
import reducers from './reducers';

const middlewares = [routerMiddleware(history)];

const store = createStore(
  reducers,
  undefined,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
