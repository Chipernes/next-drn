'use client';

import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { ReactNode } from 'react';
import YodaTheme from 'yoda-ui/yodaTheme';

export default function ThemeRegistry({ children }: { children: ReactNode }) {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={ YodaTheme }>{ children }</ThemeProvider>
    </StyledEngineProvider>
  );
}
