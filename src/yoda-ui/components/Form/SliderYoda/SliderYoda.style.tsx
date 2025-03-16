import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import { YodaSpacing } from 'yoda-ui/yodaTheme';

export const sliderYodaStyle: SxProps<Theme> = {
  paddingBottom: YodaSpacing.medium,

  '& p': {
    paddingLeft: YodaSpacing.small,
    marginTop: '0',
    marginBottom: YodaSpacing.xxSmall,
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: '0.8rem',
    fontWeight: 300,
    lineHeight: '0.6rem',
  },

  '& .MuiSlider-valueLabel': {
    fontSize: 12,
    fontWeight: 300,
    top: '2.8rem',
    backgroundColor: 'unset',
    color: 'rgba(0, 0, 0, 0.6)',
    '&:before': {
      display: 'none',
    },
  },
};
