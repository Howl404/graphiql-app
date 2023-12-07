import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  PropsWithChildren,
  useEffect,
} from 'react';
import { Languages } from 'src/types';

type LangContextType = {
  lang: Languages;
  setLang: Dispatch<SetStateAction<Languages>>;
};

export const LangContext = createContext<LangContextType>(null!);

export function LangContextProvider({ children }: PropsWithChildren) {
  const localLanguage = localStorage.getItem('lang');
  const [lang, setLang] = useState<Languages>(
    localLanguage === 'EN' || localLanguage === 'RU'
      ? localLanguage
      : '' || 'EN'
  );

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  const value = { lang, setLang };

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}
