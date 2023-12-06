import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  PropsWithChildren,
  useEffect,
} from 'react';

type LangContextType = {
  lang: string;
  setLang: Dispatch<SetStateAction<string>>;
};

export const LangContext = createContext<LangContextType>(null!);

export function LangContextProvider({ children }: PropsWithChildren) {
  const [lang, setLang] = useState<string>(
    localStorage.getItem('lang') || 'EN'
  );

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  const value = { lang, setLang };

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}
