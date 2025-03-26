import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import { CSSProperties } from 'react';
import { YodaJustifyContent, YodaFontSize, YodaFontWeight } from 'yoda-ui/yodaTheme';

export const headerStyle: CSSProperties = {
  width: '100%',
  height: '100px',
};

export const toolbarStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '100%',
};

export const logoStyle = {
  display: 'flex',
  alignItems: YodaJustifyContent.center,
  justifyContent: YodaJustifyContent.spaceBetween,
  fontSize: YodaFontSize.xxLarge,
  fontWeight: YodaFontWeight.bold,
  width: '320px',

  '& > img': {
    width: '5rem',
    height: '5rem',
    objectPosition: 'center',
  },

  '& > *:hover': {
    cursor: 'pointer',
  },
};

export const navbarLinksStyle: SxProps<Theme> = {
  display: 'flex',
  alignItems: YodaJustifyContent.center,
  justifyContent: YodaJustifyContent.spaceAround,
  width: '50%',
};
