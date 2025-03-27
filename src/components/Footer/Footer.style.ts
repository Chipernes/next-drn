import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import { YodaJustifyContent, YodaFontSize, YodaFontWeight } from 'yoda-ui/yodaTheme';

export const footerStyle: SxProps<Theme> = {
  height: '80px',
  display: 'flex',
  alignItems: YodaJustifyContent.center,
  justifyContent: YodaJustifyContent.center,
};

export const logoStyle = {
  display: 'flex',
  alignItems: YodaJustifyContent.center,
  justifyContent: YodaJustifyContent.spaceBetween,
  fontSize: YodaFontSize.large,
  fontWeight: YodaFontWeight.bold,

  '& > img': {
    width: '3rem',
    height: '3rem',
    objectPosition: 'center',
  },

  '& > *:hover': {
    cursor: 'pointer',
  },
};
