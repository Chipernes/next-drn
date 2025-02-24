import type { Metadata } from "next";
import "./globals.css";
import { contentStyle, footerStyle, headerStyle, wrapperStyle } from '@/app/page.style';
import Box from '@/yoda-ui/components/Box';

export const metadata: Metadata = {
  title: "Dinner Right Now",
  description: "Tasty dinner right now!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Box style={ wrapperStyle }>
          <Box style={ headerStyle }>SOME HEADER WILL BE ADDED</Box>
          <Box style={ contentStyle }>
            {children}
          </Box>
          <Box style={ footerStyle }>SOME FOOTER WILL BE ADDED</Box>
        </Box>
      </body>
    </html>
  );
}
