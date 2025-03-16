import {
  YodaBorderRadius,
  YodaColors,
  YodaFontSize,
  YodaFontWeight,
  YodaSpacing,
} from 'yoda-ui/yodaTheme';

export const radioGroupStyle = {

  '& .MuiFormControlLabel-root': {
    flex: 1,
    borderRadius: YodaBorderRadius.xSmall,
    border: `1px ${YodaColors.gray3} solid`,
    margin: 0,
    paddingLeft: YodaSpacing.small,

    '&:hover': {
      borderColor: YodaColors.black,
    },

    '&:not(:last-of-type)': {
      marginRight: YodaSpacing.small,
    },

    '&.Mui-disabled': {
      borderColor: YodaColors.gray1,
    },

  },
  '& .MuiFormControlLabel-label': {
    flex: 1,
    fontWeight: YodaFontWeight.medium,
    fontSize: YodaFontSize.small,
  },
};
