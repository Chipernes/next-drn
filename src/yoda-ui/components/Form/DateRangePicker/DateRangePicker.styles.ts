import { YodaFontSize, YodaFontWeight, YodaSpacing } from 'yoda-ui/yodaTheme';

export const dateRangePickerStyles = ({
  textField: {
    width: '100%',

    '& label': {
      fontSize: YodaFontSize.medium,
      fontWeight: YodaFontWeight.light,
    },
    '& input': {
      fontSize: YodaFontSize.small,
      fontWeight: YodaFontWeight.light,
      height: '15px',
    },
  },
  box: {
    mx: YodaSpacing.small,
  },

});
