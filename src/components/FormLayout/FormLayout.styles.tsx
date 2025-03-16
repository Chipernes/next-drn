import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import { appBarHeight } from 'basics/constants/common.constants';
import { fromUnitsToRem, YodaSpacing } from 'yoda-ui/yodaTheme';

export const formLayoutPaddingTop = fromUnitsToRem(YodaSpacing.medium);

export const formLayoutStickyStyles: SxProps<Theme> = {
  position: 'sticky',
  top: `calc(${appBarHeight} + ${formLayoutPaddingTop})`,
  alignSelf: 'start',
};
