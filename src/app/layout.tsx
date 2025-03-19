import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import { auth } from '../../auth';
import { contentStyle, footerStyle, wrapperStyle } from 'app/page.style';
import './globals.css';
import Header from 'components/header/header';
import Box from 'yoda-ui/components/Box';

export const metadata: Metadata = {
  title: 'Dinner Right Now',
  description: 'Tasty dinner right now!',
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const session = await auth();

  return (
    <html lang="en">
      <SessionProvider session={ session }>
        <body>
          <ToastContainer theme='colored' />
          <Box style={ wrapperStyle }>
            <Header session={ session }/>
            <Box sx={ contentStyle }>
              <Box flexDirection="column" marginX="auto" height="100%">
                { children }
              </Box>
            </Box>
            <Box style={ footerStyle }>SOME FOOTER WILL BE ADDED</Box>
          </Box>
        </body>
      </SessionProvider>
    </html>
  );
}
