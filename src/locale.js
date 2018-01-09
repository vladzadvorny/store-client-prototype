import { initialize, addTranslation } from 'react-localize-redux';
import getLocale from 'browser-locale';

import globalTranslation from './assets/global';

export const getStorageLocale = () => {
  const init = { interface: 'en', products: ['en'] };

  let storage = localStorage.getItem('locale');

  if (!storage) return init;
  try {
    storage = JSON.parse(storage);
  } catch (error) {
    return init;
  }
  return storage;
};

export const setStorageLocale = obj =>
  localStorage.setItem('locale', JSON.stringify(obj));

export default store => {
  const languages = ['en', 'ru'];

  let locale = getLocale()
    .split('-')[0]
    .toLowerCase();
  locale = languages.indexOf(locale) === -1 ? languages[0] : locale;

  let storage;
  storage = getStorageLocale();
  if ('interface' in storage) {
    storage =
      languages.indexOf(storage.interface) === -1 ? null : storage.interface;
  } else {
    storage = null;
  }

  store.dispatch(
    initialize(languages, {
      defaultLanguage: storage || locale
    })
  );
  store.dispatch(addTranslation(globalTranslation));
};
