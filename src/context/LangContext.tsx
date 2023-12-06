import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  PropsWithChildren,
} from 'react';

type LangContextType = {
  lang: string;
  setLang: Dispatch<SetStateAction<string>>;
};

type LangProviderProps = {
  value: string;
} & PropsWithChildren;

const defaultState: LangContextType = {
  lang: localStorage.getItem('lang') || 'EN',
  setLang: () => {},
};

export const LangContext = createContext(defaultState);

export function LangContextProvider({ children, value }: LangProviderProps) {
  const [lang, setLang] = useState<string>(value);

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}
