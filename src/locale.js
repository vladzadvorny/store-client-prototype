import { initialize, addTranslation } from 'react-localize-redux';
import getLocale from 'browser-locale';

import globalTranslation from './assets/global';

export default store => {
  const languages = ['en', 'ru'];

  let locale = getLocale()
    .split('-')[0]
    .toLowerCase();
  locale = languages.indexOf(locale) === -1 ? languages[0] : locale;

  let storage = localStorage.getItem('locale');
  storage = languages.indexOf(storage) === -1 ? null : storage;

  store.dispatch(
    initialize(languages, {
      defaultLanguage: storage || locale
    })
  );
  store.dispatch(addTranslation(globalTranslation));
};
