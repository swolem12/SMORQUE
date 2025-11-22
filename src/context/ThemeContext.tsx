import React, { createContext, useContext, useState, useEffect } from 'react';
import { type ThemeName, getTheme, applyTheme, saveTheme, loadTheme } from '../utils/theme';

interface ThemeContextType {
  currentTheme: ThemeName;
  setTheme: (theme: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>(() => loadTheme());

  useEffect(() => {
    const theme = getTheme(currentTheme);
    applyTheme(theme);
  }, [currentTheme]);

  const setTheme = (themeName: ThemeName) => {
    setCurrentTheme(themeName);
    saveTheme(themeName);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
