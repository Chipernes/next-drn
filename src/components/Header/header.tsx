import Form from 'next/form';
import Link from 'next/link';
import useHeader from './header.hook';
import { drnLogoStyle, headerStyle, toolbarStyle } from './header.style';
import { auth } from 'lib/auth';
import AppBar from 'yoda-ui/components/AppBar';
import Box from 'yoda-ui/components/Box';
import Button from 'yoda-ui/components/Button';
import Toolbar from 'yoda-ui/components/Toolbar';
import { YodaSpacing } from 'yoda-ui/yodaTheme';

const Header = async () => {
  const session = await auth();
  const {
    handleLogout,
  } = useHeader();

  return (
    <AppBar position="fixed">
      <Box sx={ headerStyle } paddingX={ YodaSpacing.small }>
        <Toolbar sx={ toolbarStyle }>
          <Link href='/'>
            <Box sx={ drnLogoStyle }>
              <img src="/logo.png" alt="DRN-logo"/>
            </Box>
          </Link>
          <Box>SOME HEADER WILL BE ADDED</Box>
          {
            session
            && <Box>
              <Box>You are logged in</Box>
              <Form action={ handleLogout }>
                <Button type={ 'submit' }>Logout</Button>
              </Form>
            </Box>
          }
        </Toolbar>
      </Box>
    </AppBar>
  );
};
export default Header;
