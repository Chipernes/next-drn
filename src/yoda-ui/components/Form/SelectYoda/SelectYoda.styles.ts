import { YodaFontSize } from 'yoda-ui/yodaTheme';

export const selectStyle = {
  '& + p.Mui-error': {
    fontWeight: 300,
  },
};

export const textFieldStyle = {
  '& label': {
    fontSize: YodaFontSize.medium,
    fontWeight: 300,
    lineHeight: '1.2rem',
  },
  '& .MuiAutocomplete-input': {
    fontSize: YodaFontSize.small,
    fontWeight: 300,
    height: '15px',
  },
};
