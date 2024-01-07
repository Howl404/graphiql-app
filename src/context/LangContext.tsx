import { createContext, PropsWithChildren, useState } from 'react';

import Languages from 'enums/languages';

type LangContextType = {
  lang: Languages;
  setLang: (newLang: Languages) => void;
};

export const LangContext = createContext<LangContextType>(null!);

export default function LangContextProvider({ children }: PropsWithChildren) {
  const initialLang =
    (localStorage.getItem('lang') as Languages | null) ?? Languages.EN;
  const [lang, setLang] = useState<Languages>(initialLang);

  const handleChangeLang = (newLang: Languages) => {
    setLang(newLang);
    localStorage.setItem('lang', newLang);
  };

  const value = { lang, setLang: handleChangeLang };

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}
