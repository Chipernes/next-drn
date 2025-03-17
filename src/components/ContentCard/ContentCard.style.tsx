import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import { fromUnitsToRem, YodaSpacing, YodaColors } from 'yoda-ui/yodaTheme';

export const contentCardStyle: SxProps<Theme> = {
  border: 'none',
  padding: fromUnitsToRem(YodaSpacing.xxLarge),
  boxShadow: `0px 5px 20px ${YodaColors.gray2}`,
  overflow: 'visible',
};
