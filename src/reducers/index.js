import { combineReducers } from 'redux';
import { localeReducer as locale } from 'react-localize-redux';

import me from './me';
import refetch from './refetch';

export default combineReducers({
  locale,
  me,
  refetch
});
