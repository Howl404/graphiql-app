import { useContext } from 'react';
import { LangContext } from 'src/context/LangContext.tsx';
import EN from 'src/locales/en.json';
import RU from 'src/locales/ru.json';

type TranslationKeys = keyof typeof EN;

const translations = {
  EN,
  RU,
};

export const useTranslation = () => {
  const { lang } = useContext(LangContext);

  const t = (key: TranslationKeys): string => {
    return translations[lang][key];
  };

  return { t };
};
