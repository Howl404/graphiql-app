import { LangContextProvider } from './context/LangContext';
import AppRouter from './router/AppRouter';

export default function App() {
  return (
    <LangContextProvider value={localStorage.getItem('lang') || 'EN'}>
      <AppRouter />
    </LangContextProvider>
  );
}
