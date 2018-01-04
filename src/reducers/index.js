import { combineReducers } from 'redux';
import { localeReducer as locale } from 'react-localize-redux';
import { apolloReducer as apollo } from 'apollo-cache-redux';

import me from './me';

export default combineReducers({
  locale,
  apollo,
  me
});
