import { YodaFontSize } from 'yoda-ui/yodaTheme';

export const textYodaStyle = {
  '& label': {
    fontSize: YodaFontSize.medium,
    fontWeight: 300,
    lineHeight: '1rem',
  },
  '& input': {
    fontSize: YodaFontSize.small,
    fontWeight: 300,
    height: '15px',
  },
  '& textarea': {
    fontSize: YodaFontSize.small,
    fontWeight: 300,
  },
  '& p.Mui-error': {
    margin: 0,
    fontWeight: 300,
  },
};

export const textYodaNoControlsStyle = {
  '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
    WebkitAppearance: 'none',
    margin: 0,
  },

  '& input': {
    MozAppearance: 'textfield',
  },
};
