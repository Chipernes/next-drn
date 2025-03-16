import Button from '@mui/material/Button';
import { FC } from 'react';
import getStyles from './IconButton.styles';
import {
  ButtonBackgroundType,
  ButtonBaseProps,
  ButtonReverse,
  ButtonSize,
  ButtonVariant,
} from 'yoda-ui/components/BiogenLincDS/Buttons/Buttons.types';
import Box from 'yoda-ui/components/Box';
import Icon, { Icons } from 'yoda-ui/components/Icons/Icon';
import Typography from 'yoda-ui/components/Typography';
import { YodaColors, YodaFontWeight, YodaSpacing, YodaFontSize } from 'yoda-ui/yodaTheme';

export type IconButtonProps = ButtonBaseProps & {
  icon: Icons;
  backgroundType?: ButtonBackgroundType;
  variant?: ButtonVariant;
  size?: ButtonSize;
  label?: string;
};

const IconButton: FC<IconButtonProps> = ({
  variant = ButtonVariant.primary,
  reverse = ButtonReverse.noReverse,
  size = ButtonSize.medium,
  backgroundType = ButtonBackgroundType.normal,
  sx,
  icon,
  label,
  disabled,
  ...buttonProps
}) => {
  const styles = getStyles({ variant, reverse, size, sx, backgroundType });
  const iconSize = size === ButtonSize.medium ? 'medium' : 'small';
  let labelColor = reverse === ButtonReverse.noReverse ? YodaColors.gray4 : YodaColors.white;
  if (disabled) {
    labelColor = 'color' in styles ? styles.color as YodaColors : YodaColors.gray3;
  }

  return (
    <Box display="inline-flex" flexDirection="row" alignItems="center">
      <Button
        disableElevation
        disableRipple
        sx={ styles }
        disabled={ disabled }
        { ...buttonProps }
      >
        <Icon name={ icon } fontSize={ iconSize }/>
      </Button>
      {
        label && backgroundType !== ButtonBackgroundType.noBackground && (
          <Typography
            marginLeft={ YodaSpacing.xxSmall }
            color={ labelColor }
            fontSize={ YodaFontSize.medium }
            fontWeight={ YodaFontWeight.light }
          >
            { label }
          </Typography>
        )
      }
    </Box>

  );
};

export default IconButton;
