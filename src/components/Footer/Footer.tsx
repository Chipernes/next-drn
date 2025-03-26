import Link from 'next/link';
import { footerStyle, logoStyle } from './Footer.style';
import Box from 'yoda-ui/components/Box';
import { YodaColors } from 'yoda-ui/yodaTheme';

const Footer = () => {
  return (
    <Box sx={ footerStyle } className='bg-white'>
      <Link href='/'>
        <Box sx={ logoStyle }>
          <img src="/logo.png" alt="DRN-logo"/>
          <Box sx={ { color: YodaColors.primaryBlue } }>Diner Right Now 2024</Box>
        </Box>
      </Link>
    </Box>
  );
};
export default Footer;
