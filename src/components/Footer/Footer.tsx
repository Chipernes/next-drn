import Link from 'next/link';
import { footerStyle, logoStyle } from './Footer.style';
import Box from 'yoda-ui/components/Box';
import { YodaColors } from 'yoda-ui/yodaTheme';

const Footer = () => {
  return (
    <Box sx={ footerStyle } className='bg-white mt-auto'>
      <Link href='/'>
        <Box sx={ logoStyle }>
          <img src="/logo.png" alt="DRN-logo"/>
          <Box sx={ { color: YodaColors.primaryBlue } }>Diner Right Now 2025</Box>
        </Box>
      </Link>
    </Box>
  );
};
export default Footer;
