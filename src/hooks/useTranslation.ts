import { useContext } from 'react';

import EN from 'locales/en.json';
import RU from 'locales/ru.json';

import { LangContext } from 'context/LangContext';

type TranslationKeys = keyof typeof EN;

const translations = {
  EN,
  RU,
};

export const useTranslation = () => {
  const { lang } = useContext(LangContext);

  const translation = (key: TranslationKeys): string => {
    return translations[lang][key];
  };

  return translation;
};
