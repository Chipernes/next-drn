import { StyledEngineProvider } from '@mui/material/styles';
import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import { contentStyle, footerStyle, wrapperStyle } from 'app/page.style';
import Header from 'components/Header/header';
import './globals.css';
import ThemeRegistry from 'components/ThemeRegistry/ThemeRegistry';
import Box from 'yoda-ui/components/Box';

export const metadata: Metadata = {
  title: 'Dinner Right Now',
  description: 'Tasty dinner right now!',
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <ThemeRegistry>
            <StyledEngineProvider injectFirst>
              <ToastContainer theme='colored' />
              <Box style={ wrapperStyle }>
                <Header/>
                <Box sx={ contentStyle }>
                  <Box flexDirection="column" marginX="auto" height="100%">
                    { children }
                  </Box>
                </Box>
                <Box style={ footerStyle }>SOME FOOTER WILL BE ADDED</Box>
              </Box>
            </StyledEngineProvider>
          </ThemeRegistry>
        </SessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
