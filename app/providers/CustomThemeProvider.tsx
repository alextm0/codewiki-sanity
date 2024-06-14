'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ReactNode } from 'react';

interface CustomThemeProviderProps {
  children: ReactNode;
}

const CustomThemeProvider = ({ children }: CustomThemeProviderProps) => {
  return <NextThemesProvider attribute="class">{children}</NextThemesProvider>;
};

export default CustomThemeProvider;
