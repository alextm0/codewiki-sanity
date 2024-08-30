'use client';

import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';

interface CustomThemeProviderProps {
  children: ReactNode;
}

const CustomThemeProvider = ({ children }: CustomThemeProviderProps) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      forcedTheme="light"  // Force theme to be light
    >
      {children}
    </ThemeProvider>
  );
};

export default CustomThemeProvider;
