import Form from 'next/form';
import Link from 'next/link';
import useHeader from './Header.hook';
import { headerStyle, navbarLinksStyle, toolbarStyle, logoStyle } from './Header.style';
import { UserRolesEnum } from 'basics/enums/auth.enum';
import AppBar from 'yoda-ui/components/AppBar';
import Box from 'yoda-ui/components/Box';
import Button from 'yoda-ui/components/Button';
import { ButtonType } from 'yoda-ui/components/Button/Button.types';
import Toolbar from 'yoda-ui/components/Toolbar';
import { YodaColors, YodaSpacing } from 'yoda-ui/yodaTheme';

const Header = async () => {
  const {
    handleLogout,
    session,
  } = await useHeader();

  const displayNavigationButtons = (role: string) => {
    if (role === UserRolesEnum.service) {
      return <>
        <Box sx={ navbarLinksStyle }>
          <Link href='/service'>
            <Button buttonType={ ButtonType.primary }>Go to Service</Button>
          </Link>
        </Box>
      </>;
    } if (role === UserRolesEnum.kitchen) {
      return <>
        <Box sx={ navbarLinksStyle }>
          <Link href='/kitchen'>
            <Button buttonType={ ButtonType.primary }>Go to Kitchen</Button>
          </Link>
        </Box>
      </>;
    } if (role === UserRolesEnum.administration) {
      return <>
        <Box sx={ navbarLinksStyle }>
          <Link href='/service'>
            <Button buttonType={ ButtonType.primary }>Go to Service</Button>
          </Link>
          <Link href='/kitchen'>
            <Button buttonType={ ButtonType.primary }>Go to Kitchen</Button>
          </Link>
          <Link href='/administration'>
            <Button buttonType={ ButtonType.primary }>Go to Administration</Button>
          </Link>
        </Box>
      </>;
    }

    return '';
  };

  const displayAuthButtons = (isAuthenticated: boolean) => {
    if (isAuthenticated) {
      return <>
        <Box>
          <Form action={ handleLogout }>
            <Button type={ 'submit' }>Logout</Button>
          </Form>
        </Box>
      </>;
    }

    return <>
      <Box>
        <Link href='/verify'>
          <Button buttonType={ ButtonType.home }>Go to Verifying</Button>
        </Link>
      </Box>
    </>;
  };

  return (
    <AppBar position="fixed">
      <Box sx={ headerStyle } paddingX={ YodaSpacing.small }>
        <Toolbar sx={ toolbarStyle }>
          <Link href='/'>
            <Box sx={ logoStyle }>
              <img src="/logo.png" alt="DRN-logo"/>
              <Box sx={ { color: YodaColors.primaryBlue } }>Diner Right Now</Box>
            </Box>
          </Link>
          { session && session.user?.role && displayNavigationButtons(session.user?.role) }
          { session ? displayAuthButtons(true) : displayAuthButtons(false) }
        </Toolbar>
      </Box>
    </AppBar>
  );
};
export default Header;
