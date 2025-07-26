import { useEffect } from 'react';
import AppRouters from "./routes";
import { ConfigProvider, theme as antdTheme } from 'antd';
import { useThemeStore } from './store/useThemeStore';

function App() {
  const { theme } = useThemeStore();

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    document.body.style.background = theme === 'dark' ? '#141414' : '#fff';
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [theme]);

  return (
    <ConfigProvider
      theme={{
        algorithm: theme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
      }}
    >
      <AppRouters />
    </ConfigProvider>
  );
}

export default App;
