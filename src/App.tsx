import LangContextProvider from 'context/LangContext';
import AppThemeProvider from 'context/ThemeContext';

import AppRouter from './router/AppRouter';

export default function App() {
  return (
    <AppThemeProvider>
      <LangContextProvider>
        <AppRouter />
      </LangContextProvider>
    </AppThemeProvider>
  );
}
