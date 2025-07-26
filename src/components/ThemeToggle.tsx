import React from 'react';
import { Switch } from 'antd';
import { SunFilled, SunOutlined } from '@ant-design/icons';
import { useThemeStore } from '../store/useThemeStore';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <Switch
      checked={theme === 'dark'}
      onChange={toggleTheme}
      checkedChildren={<SunFilled />}
      unCheckedChildren={<SunOutlined />}
      aria-label="Toggle dark mode"
    />
  );
};

export default ThemeToggle; 