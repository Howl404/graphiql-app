import LangContextProvider from 'context/LangContext';

import AppRouter from './router/AppRouter';

export default function App() {
  return (
    <LangContextProvider>
      <AppRouter />
    </LangContextProvider>
  );
}
