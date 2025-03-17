import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import { fromUnitsToRem, YodaSpacing, YodaJustifyContent, YodaBorderRadius } from 'yoda-ui/yodaTheme';

export const formContainerStyle: SxProps<Theme> = {
  width: '100%',
  paddingBottom: YodaSpacing.large,
};

export const formContainerContentStyle: SxProps<Theme> = {
  marginBottom: fromUnitsToRem(YodaSpacing.xLarge),
  borderRadius: YodaBorderRadius.small,
};

export const formContainerActionsStyle: SxProps<Theme> = {
  display: 'flex',
  justifyContent: YodaJustifyContent.spaceBetween,
  bottom: YodaSpacing.xxLarge,
  left: 0,
  right: 0,
};

export const formContainerLeftActionsStyle: SxProps<Theme> = {
  display: 'flex',
  justifyContent: YodaJustifyContent.flexStart,
  gap: YodaSpacing.medium,
};
