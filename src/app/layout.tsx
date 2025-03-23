import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import Header from '../components/Header/header';
import { contentStyle, footerStyle, wrapperStyle } from 'app/page.style';
import './globals.css';
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
        </SessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
