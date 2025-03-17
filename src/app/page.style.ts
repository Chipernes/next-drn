import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import { CSSProperties } from 'react';
import { fromUnitsToRem, YodaColors, YodaFontSize, YodaJustifyContent, YodaSpacing } from 'yoda-ui/yodaTheme';

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
  paddingY: YodaSpacing.medium,
  paddingX: fromUnitsToRem(60),
  backgroundColor: YodaColors.blue1,
  width: '100%',
  boxSizing: 'border-box',
};

export const headerStyle: CSSProperties = {
  height: '80px',
  background: YodaColors.gray4,
  display: 'flex',
  alignItems: YodaJustifyContent.center,
  justifyContent: YodaJustifyContent.center,
  padding: '0 20px',
  color: YodaColors.white,
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
