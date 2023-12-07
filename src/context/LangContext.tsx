import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  PropsWithChildren,
  useEffect,
} from 'react';
import { Languages } from 'src/enums/Languages';

type LangContextType = {
  lang: Languages;
  setLang: Dispatch<SetStateAction<Languages>>;
};

export const LangContext = createContext<LangContextType>(null!);

export function LangContextProvider({ children }: PropsWithChildren) {
  const initialLang =
    (localStorage.getItem('lang') as Languages | null) ?? Languages.EN;
  const [lang, setLang] = useState<Languages>(initialLang);

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  const value = { lang, setLang };

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}
