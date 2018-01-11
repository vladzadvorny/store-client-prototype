import { combineReducers } from 'redux';
import { localeReducer as locale } from 'react-localize-redux';
import { routerReducer } from 'react-router-redux';

import me from './me';
import refetch from './refetch';

export default combineReducers({
  router: routerReducer,
  locale,
  me,
  refetch
});
