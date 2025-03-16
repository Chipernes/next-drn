import { YodaColors, YodaFontSize } from 'yoda-ui/yodaTheme';

export const stepperStyle = {
  padding: 0,
  fontSize: YodaFontSize.small,

  '& span': {
    color: `${YodaColors.gray5}`,
    fontWeight: 300,
    cursor: 'pointer',
    '&.Mui-disabled': {
      cursor: 'not-allowed',
    },
  },
  '& span.MuiStepLabel-completed': {
    color: `${YodaColors.gray5}`,
    fontWeight: 300,
  },
  '& span.Mui-active': {
    color: `${YodaColors.primaryBlue}`,
    fontWeight: 300,
  },
  '& span.Mui-error': {
    color: `${YodaColors.gray5}`,
    fontWeight: 300,
  },
};
