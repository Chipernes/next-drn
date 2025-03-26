import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import { CSSProperties } from 'react';
import { YodaColors, YodaJustifyContent } from 'yoda-ui/yodaTheme';

export const wrapperStyle: CSSProperties = {
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  background: YodaColors.background,
};

export const contentStyle: SxProps<Theme> = {
  position: 'relative',
  flex: 3,
  paddingTop: '130px',
  paddingBottom: '30px',
  paddingX: '4rem',
  backgroundColor: '#e3e3de',
  width: '100%',
  boxSizing: 'border-box',
};

export const footerStyle: CSSProperties = {
  height: '80px',
  background: YodaColors.gray4,
  display: 'flex',
  alignItems: YodaJustifyContent.center,
  justifyContent: YodaJustifyContent.center,
  padding: '0 20px',
  color: YodaColors.white,
};
