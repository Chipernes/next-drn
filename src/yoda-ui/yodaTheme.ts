/* eslint-disable @typescript-eslint/no-duplicate-enum-values */
import { createTheme, Theme } from '@mui/material/styles';
import { SxProps as MuiSxProps } from '@mui/system';

export const SPACING_FACTOR = 0.125;
export const fromUnitsToRem = (unit: number) => `${unit * SPACING_FACTOR}rem`;

export enum AlertSeverity {
  'info' = 'info',
  'success' = 'success',
  'error' = 'error',
  'warning' = 'warning',
}

export type SxProps = MuiSxProps<Theme>;

export enum YodaColors {
  background = 'linear-gradient(toTop, rgba(253,253,253,1) 50%, rgba(253,254,255,1) 100%)',
  black = '#000',
  blue1 = '#F0F3F7',
  blue2 = '#E4F0FD',
  blue3 = '#B5D6F6',
  blue4 = '#98BDE6',
  blue5 = '#41698E',
  blue7 = '#1F49E0',
  blue8 = '#0D38BA',
  completed = '#07CDB5',
  error = '#E05050',
  errorLight = '#FECDED',
  gray0 = '#FBFBFB',
  gray1 = '#F0F2F5',
  gray2 = '#DCE0E7',
  gray3 = '#A9B4C5',
  gray4 = '#57667E',
  gray5 = '#1F252E',
  gray8 = '#40536E',
  gray9 = '#122035',
  grayLight = 'rgba(31, 37, 46, 0.03)',
  green = '#30E0B6',
  green1 = '#6dad46',
  green2 = '#53D8BD',
  greenSuccessDark = '#06AC98',
  greenSuccessLight = '#E6FAF8',
  inherit = 'inherit',
  orange = '#F2BC88',
  orangeWarningDark = '#AC5F16',
  orangeWarningLight = '#F7EEE6',
  redErrorDark = '#5F2120',
  redErrorLight = '#FDEDED',
  petrol = '#243A47',
  primaryBlue = '#0087CD',
  primaryBlueHover = '#006599',
  primaryBlueLight = 'rgba(0, 135, 205, 0.10)',
  primaryBlueLightest = '#E5F3FA',
  purple = '#8139BA',
  purple1 = '#CB72ED',
  red = '#E4392C',
  red1 = '#E4392C',
  transparent = 'transparent',
  textPrimary = '#122035',
  textSecondary = '#5B6C8A',
  warning = '#DB9143',
  warningLight = '#FCF4EC',
  white = '#FFF',
  white10 = 'rgba(255,255,255,0.1)',
  white20 = 'rgba(255,255,255,0.2)',
  white30 = 'rgba(255,255,255,0.3)',
  white60 = 'rgba(255,255,255,0.6)',
  white80 = 'rgba(255,255,255,0.8)',
  white90 = 'rgba(255,255,255,0.9)',
  whiteHover = '#F8FCFE',
  yellow = '#FFD468',
}

export enum YodaSpacing {
  none = 0,
  xxxxSmall = 1,
  xxxSmall = 2,
  xxSmall = 4,
  xSmall = 6,
  small = 8,
  medium = 12,
  large = 16,
  xLarge = 20,
  xxLarge = 24,
  xxxLarge = 28,
  xxxxLarge = 30,
}

export enum YodaGridCellSize {
  xxxSmall = 1,
  xxSmall = 2,
  xSmall = 3,
  small = 4,
  half = 6,
  full = 12,
}

export enum YodaBorderRadius {
  none = '0',
  xxSmall = '0.125rem',
  xSmall = '.25rem',
  small = '.5rem',
  medium = '1rem',
  large = '1.5rem',
  xLarge = '2rem',
  xxLarge = '3rem',
  xxxLarge = '5rem',
  round = '100%',
}

export enum YodaBoxShadow {
  down = '0px 12px 8px -4px rgba(87, 102, 126, 0.05)',
  medium = '0px 4px 64px 0px rgba(87, 102, 126, 0.12)',
  large = '0px 15px 46px 0px rgba(87, 102, 126,0.24)',
  reverse = '0px -3px 19px 0px rgba(87, 102, 126, 0.13)',
}

export enum YodaFontSize {
  xxSmall = '0.625rem',
  xSmall = '0.75rem',
  small = '0.875rem',
  medium = '1rem',
  large = '1.125rem',
  xLarge = '1.25rem',
  xxLarge = '1.75rem',
  xxxLarge = '2rem',
  xxxxLarge = '3rem',
}

export enum YodaFontWeight {
  light = 'fontWeightLight',
  regular = 'fontWeightRegular',
  medium = 'fontWeightMedium',
  bold = 'fontWeightBold',
}

export enum YodaJustifyContent {
  center = 'center',
  flexEnd = 'flex-end',
  flexStart = 'flex-start',
  spaceAround = 'space-around',
  spaceBetween = 'space-between',
  spaceEvenly = 'space-evenly',
}

export const yodaTheme: Theme = createTheme({
  palette: {
    primary: {
      main: YodaColors.primaryBlue,
    },
    secondary: {
      main: YodaColors.red,
    },
  },
  typography: {
    fontFamily: 'Poppins, -apple-system, BlinkMacSystemFont, sans-serif',
    fontSize: 16,
  },
  spacing: fromUnitsToRem,
});

export default yodaTheme;
