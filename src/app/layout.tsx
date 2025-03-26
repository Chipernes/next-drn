import { StyledEngineProvider } from '@mui/material/styles';
import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import './globals.css';
import ThemeRegistry from 'components/ThemeRegistry/ThemeRegistry';
import Box from 'yoda-ui/components/Box';
import { YodaColors } from 'yoda-ui/yodaTheme';

export const metadata: Metadata = {
  title: 'Dinner Right Now',
  description: 'Tasty dinner right now!',
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body style={ { backgroundColor: YodaColors.background } }>
        <SessionProvider>
          <ThemeRegistry>
            <StyledEngineProvider injectFirst>
              <ToastContainer theme='colored' />
              <Box className='flex flex-col min-h-[100vh]'>
                <Header/>
                <Box className='mt-[130px] mb-[30px]' flexDirection="column" marginX="auto" height="100%">
                  { children }
                </Box>
                <Footer/>
              </Box>
            </StyledEngineProvider>
          </ThemeRegistry>
        </SessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
