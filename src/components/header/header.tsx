import Form from 'next/form';
import { Session } from 'next-auth';
import useHeader from './header.hook';
import { drnLogoStyle, headerStyle, toolbarStyle } from './header.style';
import AppBar from 'yoda-ui/components/AppBar';
import Box from 'yoda-ui/components/Box';
import Button from 'yoda-ui/components/Button';
import Toolbar from 'yoda-ui/components/Toolbar';
import { YodaSpacing } from 'yoda-ui/yodaTheme';

const Header = ({ session }: { session: Session | null }) => {
  const {
    handleLogout,
  } = useHeader();

  return (
    <AppBar position="fixed">
      <Box sx={ headerStyle } paddingX={ YodaSpacing.small }>
        <Toolbar sx={ toolbarStyle }>
          <Box sx={ drnLogoStyle }>
            <img src="/logo.png" alt="DRN-logo"/>
          </Box>
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
