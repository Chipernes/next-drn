import MuiAvatar, { AvatarProps } from '@mui/material/Avatar';
import { FC } from 'react';
import Box from 'yoda-ui/components/Box';
import { YodaColors, YodaFontSize } from 'yoda-ui/yodaTheme';

const Avatar: FC<AvatarProps> = ({ children, ...props }) => (
  <MuiAvatar { ...props } sx={ { bgcolor: YodaColors.primaryBlue } }>
    <Box fontSize={ YodaFontSize.large }>
      { children }
    </Box>
  </MuiAvatar>
);

export default Avatar;
