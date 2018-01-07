import { combineReducers } from 'redux';
import { localeReducer as locale } from 'react-localize-redux';

import me from './me';

export default combineReducers({
  locale,
  me
});
