import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { FC } from 'react';
import Box from 'yoda-ui/components/Box';
import { YodaColors, YodaSpacing } from 'yoda-ui/yodaTheme';

type AppBarProps = MuiAppBarProps;

export const appBarStyle = {
  '&.MuiAppBar-colorDefault': {
    backgroundColor: YodaColors.white,
  },
};

const AppBar: FC<AppBarProps> = ({ children, ...props }) => (
  <MuiAppBar
    position="static"
    color="default"
    elevation={ 0 }
    sx={ appBarStyle }
    { ...props }
  >
    <Box padding={ YodaSpacing.small }>
      { children }
    </Box>
  </MuiAppBar>
);

export default AppBar;
