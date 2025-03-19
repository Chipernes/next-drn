import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import { CSSProperties } from 'react';
import { appBarHeight } from 'basics/constants/common.constants';
import { YodaColors, YodaFontSize, YodaJustifyContent } from 'yoda-ui/yodaTheme';

export const pageStyle: CSSProperties = {
  fontSize: YodaFontSize.xxxLarge,
  color: YodaColors.blue8,
};

export const wrapperStyle: CSSProperties = {
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  background: YodaColors.background,
};

export const contentStyle: SxProps<Theme> = {
  position: 'relative',
  flex: 3,
  paddingTop: '150px',
  paddingX: '4rem',
  backgroundColor: YodaColors.blue1,
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
